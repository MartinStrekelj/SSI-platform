import { ISchema } from '@ssi-ms/interfaces'
import { createNewSchemaRequest } from 'apps/ssi-platform/shared/Api/SchemasApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { NewSchemaForm } from 'apps/ssi-platform/shared/components/forms/new-schema-form'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'

const CreateSchema = () => {
  const { router, identity } = useDashboardContext()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { dangerToast, successToast } = useToasts()

  const handleCreateSchema = async (schema: ISchema) => {
    setSubmitting(true)
    const response = await createNewSchemaRequest(schema)
    setSubmitting(false)
    if (!response.ok) {
      return dangerToast({ title: response.message })
    }

    successToast({})
    return router.push('/dashboard')
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
