import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import React from 'react'
import { Menu, X } from 'react-feather'
import Logo from '../../logo'
import GithubButton from './GithubButton'
import NavigationItems from './nav'
import NavButton from './NavButton'
import { NavLink } from './NavLink'

export const MobileBurger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton aria-label="open-burger" variant={'ghost'} icon={<Icon as={Menu} h={8} w={8} />} onClick={onOpen} />
      <Drawer onClose={onClose} isOpen={isOpen} size={'full'} placement="top">
        <DrawerOverlay />
        <DrawerContent position={'relative'}>
          <IconButton
            position={'absolute'}
            right={8}
            top={4}
            variant="ghost"
            aria-label="close-menu"
            onClick={onClose}
            icon={<Icon as={X} />}
          />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody display={'flex'} flexDirection="column" gap={4}>
            <NavButton label={'enter dashboard'} />
            <GithubButton withLabel />
            {NavigationItems.map((item) => (
              <NavLink label={item.title} href={item.href} key={item.href} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileBurger
