import { Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { IVerificationPolicyDTO } from '@ssi-ms/interfaces'
import { createNewPolicyRequest } from 'apps/ssi-platform/shared/Api/PolicyApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import { NewPolicyForm } from 'apps/ssi-platform/shared/components/forms/NewPolicyForm'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useState } from 'react'
import { List, ChevronRight } from 'react-feather'

const NewVerification = () => {
  const { router, identity } = useDashboardContext()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const { dangerToast, successToast } = useToasts()

  const handleSubmit = async (data: IVerificationPolicyDTO) => {
    setSubmitting(true)
    const response = await createNewPolicyRequest(data)
    setSubmitting(false)

    if (response.ok) {
      successToast({ description: response.message })
      return setSuccess(true)
    }

    return dangerToast({ description: response.message })
  }

  const onCreateAnotherClick = () => setSuccess(false)
  const onSeeListClick = () => router.push('/dashboard/verification/')

  const pageTitle = success ? 'New policy created succesfully!' : 'Create new verification policy'

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label={pageTitle} />
      {success ? (
        <ButtonGroup size="lg">
          <Button rightIcon={<Icon as={List} />} onClick={onSeeListClick}>
            See all your policies
          </Button>
          <Button rightIcon={<Icon as={ChevronRight} />} onClick={onCreateAnotherClick}>
            Create another one
          </Button>
        </ButtonGroup>
      ) : (
        <NewPolicyForm verifier={identity} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}

export default NewVerification
NewVerification.layout = DashboardLayout
NewVerification.provider = DashboardContextProvider
