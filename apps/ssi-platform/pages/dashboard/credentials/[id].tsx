import { Box, SimpleGrid } from '@chakra-ui/react'
import { hasRoleHolder, IClaimValueTypes } from '@ssi-ms/interfaces'
import { getCredentialTransferCode, useCredential } from 'apps/ssi-platform/shared/Api/CredentialsApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { FullPageLoader } from 'apps/ssi-platform/shared/components/loaders/fullpage'
import { TransferCredentialModal } from 'apps/ssi-platform/shared/components/modals/transfer'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { TableWidget } from 'apps/ssi-platform/shared/components/widgets/table'

import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'

import { formatDate } from '@ssi-ms/utils'

const CredentialDetailPage = () => {
  const { router, identity } = useDashboardContext()
  const { id } = router.query
  const { data, isLoading } = useCredential(id as string)
  const [transferCode, setTransferCode] = useState<string | undefined>(undefined)
  const { dangerToast } = useToasts()

  const isHolder = hasRoleHolder(identity.metadata.role)

  const onTransferCredential = async () => {
    if (!!transferCode) {
      return
    }

    const response = await getCredentialTransferCode(id as string)

    if (!response.ok) {
      return dangerToast({})
    }

    setTransferCode(response.message)
  }

  if (isLoading) {
    return <FullPageLoader relative />
  }

  const basicInfo = [
    ['From', data.credential.issuer],
    ['To', data.credential.subject],
    ['Issued on', formatDate(data.credential.issuanceDate)],
    ['Expiry date', formatDate(data.credential.expiryDate)],
  ]

  const claimsInfo = {
    head: ['#', 'title', 'type', 'value'],
    body: [...data.credential.claims.map((claim, i) => [i + 1, claim.title, claim.type, displayValue(claim.value)])],
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={`Credential ${data.credential.type}`} />
      <Box>
        {isHolder && (
          <TransferCredentialModal
            label="Transfer credential to mobile wallet"
            credentialTransferCode={transferCode}
            onOpen={onTransferCredential}
          />
        )}
      </Box>
      <SimpleGrid gap={5} w={'75%'}>
        <TableWidget title="Basic info" body={basicInfo} />
        <TableWidget title="Claims" head={claimsInfo.head} body={claimsInfo.body} />
      </SimpleGrid>
    </>
  )
}

const displayValue = (value: IClaimValueTypes) => {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False'
  }

  return value
}

export default CredentialDetailPage
CredentialDetailPage.layout = DashboardLayout
CredentialDetailPage.provider = DashboardContextProvider
