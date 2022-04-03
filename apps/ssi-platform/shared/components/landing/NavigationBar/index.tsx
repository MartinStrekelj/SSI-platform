import { Flex, Box, Text, Button, Container } from '@chakra-ui/react'
import React from 'react'
import Logo from '../../../../public/assets/logo-placeholder.png'
import Image from 'next/image'
import { NavLink } from './NavLink'
import NavButton from './NavButton'
import GithubButton from './GithubButton'

const NavigationBar = () => {
  return (
    <Box
      zIndex={100}
      as="nav"
      px={4}
      h="90px"
      w="100%"
      shadow={'md'}
      position="fixed"
      backdropFilter="saturate(180%) blur(5px)"
    >
      <Container maxW="container.xl" display={'flex'} h="100%" gap={16} alignItems="center">
        <Image alt="logo" width={65} height={65} layout="fixed" src={Logo} />
        <Flex justifyContent={'space-between'} flexGrow={1}>
          <Flex gap={16} alignItems="center">
            <NavLink label={'About'} />
            <NavLink label={'Statistics'} />
            <NavLink label={'How it works?'} />
            <NavLink label={'How to start?'} />
          </Flex>
          <Flex gap={4}>
            <GithubButton />
            <NavButton label={'Enter dashboard'} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavigationBar
