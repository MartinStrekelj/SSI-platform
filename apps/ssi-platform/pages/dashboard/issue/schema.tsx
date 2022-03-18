import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { IssueFromSchemaForm } from 'apps/ssi-platform/shared/components/forms/IssueFromSchemaForm'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

// Template === Schema
const IssueFromSchema = () => {
  const { router } = useDashboardContext()
  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Issue new credential from schema" />
      <IssueFromSchemaForm />
    </>
  )
}

export default IssueFromSchema
IssueFromSchema.layout = DashboardLayout
IssueFromSchema.provider = DashboardContextProvider
