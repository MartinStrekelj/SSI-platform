import { Text } from '@chakra-ui/react'
import { IVerificationPolicy } from '@ssi-ms/interfaces'
import { usePolicies } from 'apps/ssi-platform/shared/Api/PolicyApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { FullPageLoader } from 'apps/ssi-platform/shared/components/loaders/fullpage'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { VerificationPoliciesTable } from 'apps/ssi-platform/shared/components/policies/table'
import { TableWidget } from 'apps/ssi-platform/shared/components/widgets/table'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React, { useMemo } from 'react'

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
