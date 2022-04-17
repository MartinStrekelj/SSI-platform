import { Icon, IconButton, Text } from '@chakra-ui/react'
import { IListCredentialsDTO } from '@ssi-ms/interfaces'
import Link from 'next/link'
import React from 'react'
import { useCredentials } from '../../Api/CredentialsApi'
import { FullPageLoader } from '../loaders/fullpage'
import { TableWidget } from '../widgets/table'
import { Eye } from 'react-feather'
import { formatDate } from '@ssi-ms/utils'

export const CredentialsTable = () => {
  const { data, isLoading, isError } = useCredentials()

  if (isLoading) {
    return <FullPageLoader relative />
  }

  if (isError) {
    return <Text>Something went wrong when retrieving credentials!</Text>
  }

  const { credentials } = data as IListCredentialsDTO

  if (!credentials.length) {
    return <Text>No credentials linked to this identity</Text>
  }

  const tableValues = {
    head: ['#', 'Title', 'Issued on', 'Expiry date', 'Actions'],
    body: [
      ...credentials.map((credential, idx) => [
        idx + 1,
        credential.type,
        formatDate(credential.issuanceDate),
        formatDate(credential.expiryDate),
        <RowActions id={credential.id} />,
      ]),
    ],
  }

  return <TableWidget head={tableValues.head} body={tableValues.body} />
}

interface ActionsProps {
  id: string
}

const RowActions = ({ id }: ActionsProps) => (
  <Link href={`/dashboard/credentials/${id}`}>
    <IconButton aria-label="show-credential" icon={<Icon as={Eye} />} />
  </Link>
)
