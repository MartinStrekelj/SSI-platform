import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { Eye, Trash2 } from 'react-feather'
import { usePolicies } from '../../Api/PolicyApi'
import { FullPageLoader } from '../loaders/fullpage'
import { TableWidget } from '../widgets/table'
import { formatDate } from '@ssi-ms/utils'

export const VerificationPoliciesTable = () => {
  const { data, isLoading, isError } = usePolicies()

  if (isLoading) {
    return <FullPageLoader relative />
  }

  if (isError) {
    return <Text>Something went wrong when retrieving policies for this indentity</Text>
  }

  const { policies } = data

  if (!policies.length) {
    return <Text>No verification policy is linked to this identity</Text>
  }

  const tableValues = {
    head: ['Key', 'Created at', 'Actions'],
    body: [...policies.map((policy) => [policy.id, formatDate(policy.created_at), <RowActions id={policy.id} />])],
  }

  return <TableWidget head={tableValues.head} body={tableValues.body} />
}

interface ActionsProps {
  id: string
}

const RowActions = ({ id }: ActionsProps) => (
  <Flex gap={2}>
    <Link href={`/dashboard/verification/${id}`}>
      <IconButton aria-label="show-policy" icon={<Icon as={Eye} />} />
    </Link>
    <IconButton aria-label="delete-policy" icon={<Icon as={Trash2} />} />
  </Flex>
)
