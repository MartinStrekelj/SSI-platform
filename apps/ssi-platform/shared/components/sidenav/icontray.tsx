import { Box, Divider, Flex, Heading, Icon, Text, useBreakpointValue } from '@chakra-ui/react'
import { hasAuthorityRoles, MenuOptions } from '@ssi-ms/interfaces'
import React from 'react'
import { FilePlus, CreditCard, UserCheck } from 'react-feather'
import { useDashboardContext } from '../../lib/DashboardContext'
import Logo from '../logo'

interface IconTrayProps {
  selectMenu: (v: MenuOptions) => void
  selected: MenuOptions
}

export const IconTray = ({ selectMenu, selected }: IconTrayProps) => {
  const onlyIcon = useBreakpointValue({ base: true, xl: false })
  const { identity } = useDashboardContext()
  const isAuthority = hasAuthorityRoles(identity.metadata.role)
  return (
    <Flex flexDirection={'column'} gap={2} h="100%" w="100%">
      <Heading pt={4} px={4} fontSize="xl">
        Dashboard options
      </Heading>
      <Divider />

      <NavItem onlyIcon={onlyIcon} onClick={() => selectMenu(MenuOptions.CREDENTIAL_MANAGEMENT)}>
        <Icon as={CreditCard} w={6} h={6} />
        <Text display={['none', 'none', 'none', 'block']} textTransform={'uppercase'} fontWeight="500">
          Credential Management
        </Text>
      </NavItem>
      {isAuthority && (
        <>
          <NavItem onlyIcon={onlyIcon} onClick={() => selectMenu(MenuOptions.CREDENTIAL_GENERATION)}>
            <Icon as={FilePlus} w={6} h={6} />
            <Text display={['none', 'none', 'none', 'block']} textTransform={'uppercase'} fontWeight="500">
              Credential Generation
            </Text>
          </NavItem>
          <NavItem onlyIcon={onlyIcon} onClick={() => selectMenu(MenuOptions.CREDENTIAL_VERIFICATION)}>
            <Icon as={UserCheck} w={6} h={6} />
            <Text display={['none', 'none', 'none', 'block']} textTransform={'uppercase'} fontWeight="500">
              Credential Verification
            </Text>
          </NavItem>
        </>
      )}
    </Flex>
  )
}

const NavItem = ({ children, onClick, onlyIcon }) => (
  <Flex
    _hover={{ shadow: 'lg', cursor: 'pointer' }}
    justify={onlyIcon ? 'center' : 'flex-start'}
    align={'center'}
    padding={4}
    rounded={'md'}
    color={'black'}
    bg={'white'}
    onClick={onClick}
    gap={4}
  >
    {children}
  </Flex>
)
