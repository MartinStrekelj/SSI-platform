import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const CredentialDetailPage = () => {
  const { router } = useDashboardContext()
  const { id } = router.query
  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={`Credential ${id}`} />
    </>
  )
}

export default CredentialDetailPage
CredentialDetailPage.layout = DashboardLayout
CredentialDetailPage.provider = DashboardContextProvider
