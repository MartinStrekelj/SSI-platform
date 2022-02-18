import { useDisclosure } from '@chakra-ui/react'
import { getCredentialTransferCode, useCredential } from 'apps/ssi-platform/shared/Api/CredentialsApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { FullPageLoader } from 'apps/ssi-platform/shared/components/loaders/fullpage'
import { TransferCredentialModal } from 'apps/ssi-platform/shared/components/modals/transfer'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'

const CredentialDetailPage = () => {
  const { router } = useDashboardContext()
  const { id } = router.query
  const { data, isLoading } = useCredential(id as string)
  const [transferCode, setTransferCode] = useState<string | undefined>(undefined)
  const { dangerToast } = useToasts()

  const onTransferCredential = async () => {
    if (transferCode) {
      console.log('transfer code exists!')
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

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={`Credential ${data.credential.type}`} />
      <TransferCredentialModal credentialTransferCode={transferCode} onOpen={onTransferCredential} />
    </>
  )
}

export default CredentialDetailPage
CredentialDetailPage.layout = DashboardLayout
CredentialDetailPage.provider = DashboardContextProvider
