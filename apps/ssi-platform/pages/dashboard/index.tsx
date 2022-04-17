import { DashboardContextProvider, useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import React from 'react'
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout'
import { PageTitle } from 'apps/ssi-platform/shared/components/pagetitle'
import { hasAuthorityRoles } from '@ssi-ms/interfaces'
import { Text, Box, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import WelcomeImage from '../../public/assets/welcome.svg'

const Dashboard = () => {
  const { identity } = useDashboardContext()
  const isAuthority = hasAuthorityRoles(identity.metadata.role)
  const text = isAuthority
    ? ', which means you can issue new schemas and verifiable credentials. Platform also allows you to create verification policies which you can test in demo application to verify claims issued by verifiable credentials.'
    : ', which means that the platform allows you to inspect your credentials and transfer them to your mobile wallet.'

  const imageDimenstions = useBreakpointValue({ base: 250, xl: 500 })

  return (
    <>
      <PageTitle label="Welcome to SSI platform" />

      <Text as={'p'} fontSize={'2xl'} maxW={'750px'}>
        You are logged in as <b>{isAuthority ? 'authority' : 'holder'}</b>
        {text}
      </Text>
      <Box pt={4}>
        <Image width={imageDimenstions} height={imageDimenstions} layout="fixed" src={WelcomeImage} />
      </Box>
      <br></br>
      <Text fontSize={'2xl'}>
        <b>Use the sidemenu to navigate between different options that the platform provides.</b>
      </Text>
    </>
  )
}

export default Dashboard
Dashboard.provider = DashboardContextProvider
Dashboard.layout = DashboardLayout
