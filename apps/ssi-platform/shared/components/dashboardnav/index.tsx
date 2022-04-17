import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useDashboardContext } from '../../lib/DashboardContext'
import Logo from '../logo'
import Profile from '../modals/profile'

const DashboardNav = () => {
  const { identity: profile, onLogout } = useDashboardContext()

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} h={'60px'} p={8} pb={12} mt={4} maxW="">
      <Logo />
      <Profile profile={profile} logout={onLogout} />
    </Flex>
  )
}

export default DashboardNav
