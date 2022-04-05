import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Logo from '../logo'

const DashboardNav = () => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} h={'60px'} p={8} pb={12} mt={4} maxW="">
      <Logo />
      <Tooltip label="See public information about identity" aria-label="A tooltip" placement="left-end">
        <Avatar size={'md'} bg="primary.500" _hover={{ cursor: 'pointer' }} />
      </Tooltip>
    </Flex>
  )
}

export default DashboardNav
