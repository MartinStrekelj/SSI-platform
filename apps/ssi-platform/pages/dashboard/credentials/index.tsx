import { hasAuthorityRoles } from '@ssi-ms/interfaces'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { CredentialsList } from 'apps/ssi-platform/shared/components/credential/list'
import { CredentialsTable } from 'apps/ssi-platform/shared/components/credential/table'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const ListCredentialsPage = () => {
  const { router, identity } = useDashboardContext()

  const isAuthority = hasAuthorityRoles(identity.metadata.role)
  const pageTitle = isAuthority ? `Credentials issued by ${identity.metadata.alias}` : 'My credentials'

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={pageTitle} />
      {isAuthority ? <CredentialsTable /> : <CredentialsList />}
    </>
  )
}

export default ListCredentialsPage
ListCredentialsPage.layout = DashboardLayout
ListCredentialsPage.provider = DashboardContextProvider
