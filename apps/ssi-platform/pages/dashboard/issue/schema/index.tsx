import { ISchema } from '@ssi-ms/interfaces'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { NewSchemaForm } from 'apps/ssi-platform/shared/components/forms/new-schema-form'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'

const CreateSchema = () => {
  const { router, identity } = useDashboardContext()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const handleCreateSchema = (schema: ISchema) => {
    console.log(schema)
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Create new credential schema" />
      <NewSchemaForm authority={identity} isSubmitting={isSubmitting} handleFormSubmit={handleCreateSchema} />
    </>
  )
}

export default CreateSchema
CreateSchema.layout = DashboardLayout
CreateSchema.provider = DashboardContextProvider
