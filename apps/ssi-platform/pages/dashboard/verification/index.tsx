import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { VerificationPoliciesTable } from 'apps/ssi-platform/shared/components/policies/table'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const ListVerifications = () => {
  const { router, identity } = useDashboardContext()

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={`Verification policy issued by ${identity.metadata.alias}`} />
      <VerificationPoliciesTable />
    </>
  )
}

export default ListVerifications
ListVerifications.provider = DashboardContextProvider
ListVerifications.layout = DashboardLayout
