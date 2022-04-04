import { Flex, Box, Text, Button, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from './NavLink'
import NavButton from './NavButton'
import GithubButton from './GithubButton'
import Logo from '../../logo'
import MobileBurger from './MobileBurger'
import NavigationItems from './nav'

const NavigationBar = () => {
  const [bottom, setBottom] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const isBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
      setBottom(isBottom)
    })
    return () => window.removeEventListener('scroll', () => setBottom(false))
  }, [])

  return (
    <Box
      zIndex={100}
      as="nav"
      px={4}
      h="90px"
      w="100%"
      shadow={'md'}
      position="fixed"
      backdropFilter={bottom ? 'unset' : 'saturate(180%) blur(5px)'}
      bg={bottom ? 'white' : 'unset'}
    >
      <Container
        maxW="container.xl"
        display={'flex'}
        h="100%"
        gap={16}
        alignItems="center"
        justifyContent={['space-between', 'space-between', 'flex-start']}
      >
        <Logo />
        <Flex justifyContent={'space-between'} flexGrow={1} display={['none', 'none', 'none', 'flex']}>
          <Flex gap={16} alignItems="center">
            {NavigationItems.map((item) => (
              <NavLink label={item.title} href={item.href} key={item.href} />
            ))}
          </Flex>
          <Flex gap={4}>
            <GithubButton />
            <NavButton label={'Enter dashboard'} />
          </Flex>
        </Flex>
        <Box display={['block', 'block', 'block', 'none']}>
          <MobileBurger />
        </Box>
      </Container>
    </Box>
  )
}

export default NavigationBar
