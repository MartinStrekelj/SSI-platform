import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import { LandingCTA } from './CTA'
import { LandingImage } from './Image'

const HeroSection = () => {
  return (
    <Container as="section" maxW={'container.xl'}>
      <Flex w={'100%'} h="100%" gap={'10px'} justifyContent="space-evenly" pt={28} alignItems="center" pb={8}>
        <LandingCTA />
        <LandingImage />
      </Flex>
    </Container>
  )
}

export default HeroSection
