import { Flex, useDisclosure } from '@chakra-ui/react'
import { IconTray } from './icontray'
import React, { useState } from 'react'
import { MenuOptions } from '@ssi-ms/interfaces'
import { SubItems } from './subitems'
import { MENU_ITEMS } from './menu'

export const SideNav = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOptions>(MenuOptions.CREDENTIAL_GENERATION)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSelectMenu = (option: MenuOptions) => {
    setSelectedMenu(option)
    onOpen()
  }

  return (
    <Flex h="100%" gap={2} paddingRight={[0, 0, 2]}>
      <IconTray selectMenu={handleSelectMenu} selected={selectedMenu} />
      <SubItems isOpen={isOpen} onClose={onClose} categories={MENU_ITEMS[selectedMenu]} />
    </Flex>
  )
}
