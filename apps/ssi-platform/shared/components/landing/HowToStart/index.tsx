import { Container } from '@chakra-ui/react'
import React from 'react'
import HowToStartImage from './Image'
import Steps from './Steps'

const HowToStartSection = () => {
  return (
    <Container
      as="section"
      maxW={'container.xl'}
      display="flex"
      justifyContent={'space-between'}
      alignItems="flex-start"
      py={[8, 12, 24]}
      gap={8}
    >
      <HowToStartImage />
      <Steps />
    </Container>
  )
}

export default HowToStartSection
