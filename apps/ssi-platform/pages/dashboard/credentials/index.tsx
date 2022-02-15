import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { CredentialsList } from 'apps/ssi-platform/shared/components/credential/list'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const ListCredentialsPage = () => {
  const { router } = useDashboardContext()

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="My credentials" />
      <CredentialsList />
    </>
  )
}

export default ListCredentialsPage
ListCredentialsPage.layout = DashboardLayout
ListCredentialsPage.provider = DashboardContextProvider
