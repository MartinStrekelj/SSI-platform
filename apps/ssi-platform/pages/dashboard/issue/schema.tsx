import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { issueNewVerifiableCredential } from 'apps/ssi-platform/shared/Api/CredentialsApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { IssueFromSchemaForm } from 'apps/ssi-platform/shared/components/forms/IssueFromSchemaForm'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'

const IssueFromSchema = () => {
  const { router, identity } = useDashboardContext()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { dangerToast, successToast } = useToasts()

  const handleOnSubmit = async (dto: IVerifiableCredentialDTO) => {
    setSubmitting(true)
    const response = await issueNewVerifiableCredential(dto)
    setSubmitting(false)

    if (!response.ok) {
      return dangerToast({ description: response.message })
    }

    successToast({ description: response.message })
    return router.push('/dashboard/')
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Issue new credential from schema" />
      <IssueFromSchemaForm authority={identity} onSubmit={handleOnSubmit} isSubmitting={isSubmitting} />
    </>
  )
}

export default IssueFromSchema
IssueFromSchema.layout = DashboardLayout
IssueFromSchema.provider = DashboardContextProvider
