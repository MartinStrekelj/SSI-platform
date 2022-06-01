import { Button, Flex } from '@chakra-ui/react'
import { COMPARISON_TYPE } from '@ssi-ms/interfaces'
import { usePolicy } from 'apps/ssi-platform/shared/Api/PolicyApi'
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { FullPageLoader } from 'apps/ssi-platform/shared/components/loaders/fullpage'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { TableWidget } from 'apps/ssi-platform/shared/components/widgets/table'
import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'

const PolicyDetailPage = () => {
  const { router } = useDashboardContext()
  const { id } = router.query as { id: string }
  const { data, isLoading } = usePolicy(id)

  if (isLoading) {
    return <FullPageLoader relative />
  }

  const checkDemoClick = () => router.push(`/demo?key=${id}`)

  const basicInfo = {
    body: [
      ['Policy key', data.policy.id],
      ['Policy issuer', data.policy.issuer],
    ],
  }

  const claimsInfo = {
    head: ['Title', 'Type', 'Value', 'Comparison'],
    body: data.policy.fields.data.map((claim) => [
      claim.title,
      claim.type,
      JSON.stringify(claim.value),
      claim.comparison || COMPARISON_TYPE.EQUALS,
    ]),
  }

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <PageTitle label="Verification policy details page" />
      <Button onClick={checkDemoClick}>Check DEMO</Button>
      <Flex flexDir={'column'} gap={4} my={8} maxW="75%">
        <TableWidget title="Basic information" body={basicInfo.body} />
        <TableWidget title="Verification information" body={claimsInfo.body} head={claimsInfo.head} />
      </Flex>
    </>
  )
}

export default PolicyDetailPage
PolicyDetailPage.provider = DashboardContextProvider
PolicyDetailPage.layout = DashboardLayout
