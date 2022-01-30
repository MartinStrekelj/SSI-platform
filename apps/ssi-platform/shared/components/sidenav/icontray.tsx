import { Flex, Icon } from '@chakra-ui/react';
import { MenuOptions } from '@ssi-ms/interfaces';
import React from 'react';
import { FilePlus, LogOut, CreditCard, UserCheck } from 'react-feather';

interface IconTrayProps {
  selectMenu: (v: MenuOptions) => void;
  selected: MenuOptions;
}

export const IconTray = ({ selectMenu, selected }: IconTrayProps) => {
  return (
    <Flex flexDirection={'column'} gap={2} h="100%" paddingY={2}>
      <NavItem
        onClick={() => selectMenu(MenuOptions.CREDENTIAL_GENERATION)}
        selected={selected === MenuOptions.CREDENTIAL_GENERATION}
      >
        <Icon as={CreditCard} w={8} h={8} />
      </NavItem>
      <NavItem
        onClick={() => selectMenu(MenuOptions.CREDENTIAL_MANAGEMENT)}
        selected={selected === MenuOptions.CREDENTIAL_MANAGEMENT}
      >
        <Icon as={FilePlus} w={8} h={8} />
      </NavItem>
      <NavItem
        onClick={() => selectMenu(MenuOptions.CREDENTIAL_VERIFICATION)}
        selected={selected === MenuOptions.CREDENTIAL_VERIFICATION}
      >
        <Icon as={UserCheck} w={8} h={8} />
      </NavItem>
      <NavItem onClick={() => console.log('logout')} selected={false}>
        {/* Logout  */}
        <Icon as={LogOut} w={8} h={8} />
      </NavItem>
    </Flex>
  );
};

const NavItem = ({ children, onClick, selected }) => (
  <Flex
    _hover={{ shadow: 'lg', cursor: 'pointer' }}
    justify={'center'}
    align={'center'}
    padding={4}
    rounded={'sm'}
    _last={{ marginTop: 'auto' }}
    borderBottom={selected ? '2px' : 0}
    onClick={onClick}
  >
    {children}
  </Flex>
);
