import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { NewPolicyForm } from 'apps/ssi-platform/shared/components/forms/NewPolicyForm'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const NewVerification = () => {
  const { router, identity } = useDashboardContext()

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Create new verification policy" />
      <NewPolicyForm verifier={identity} />
    </>
  )
}

export default NewVerification
NewVerification.layout = DashboardLayout
NewVerification.provider = DashboardContextProvider
