import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import React, { useState } from 'react'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { CreateNewVCForm } from 'apps/ssi-platform/shared/components/forms/CreateNewVCForm'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { issueNewVerifiableCredential } from 'apps/ssi-platform/shared/Api/CredentialsApi'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'

const Issue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router, identity } = useDashboardContext()
  const { dangerToast, successToast } = useToasts()

  const handleIssueNewVerifiableCredentials = async (values: IVerifiableCredentialDTO) => {
    setIsSubmitting(true)
    const response = await issueNewVerifiableCredential(values)
    setIsSubmitting(false)

    if (!response.ok) {
      return dangerToast({ description: response.message })
    }

    return successToast({ description: response.message })
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Issue a new credential" />
      <CreateNewVCForm submitForm={handleIssueNewVerifiableCredentials} isSubmitting={isSubmitting} issuer={identity} />
    </>
  )
}

export default Issue
Issue.layout = DashboardLayout
Issue.provider = DashboardContextProvider
