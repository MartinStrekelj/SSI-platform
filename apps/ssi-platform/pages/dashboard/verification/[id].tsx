import { usePolicy } from 'apps/ssi-platform/shared/Api/PolicyApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { FullPageLoader } from 'apps/ssi-platform/shared/components/loaders/fullpage'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const PolicyDetailPage = () => {
  const { router } = useDashboardContext()
  const { id } = router.query as { id: string }
  const { data, isLoading } = usePolicy(id)

  if (isLoading) {
    return <FullPageLoader relative />
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Verification policy details page" />
      {JSON.stringify(data)}
    </>
  )
}

export default PolicyDetailPage
PolicyDetailPage.provider = DashboardContextProvider
PolicyDetailPage.layout = DashboardLayout
