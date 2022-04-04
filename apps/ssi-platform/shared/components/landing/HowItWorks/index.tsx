import { Box, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import { Card } from './Card'
import MobileWalletImage from '../../../../public/assets/mobile-wallet.svg'
import PlatformForHolders from '../../../../public/assets/platform-for-holders.svg'
import PlatformForIssuers from '../../../../public/assets/platform-for-issuers.svg'

const HowItWorksSection = () => {
  return (
    <Box as="section" w="100%" bgGradient={'linear(to-r, primary.500, secondary.500)'}>
      <Heading textAlign={'center'} pt={8} pb={4} color={'white'} fontSize={['4xl', '6xl']}>
        How it works
      </Heading>
      <Container
        h={'100%'}
        w={'100%'}
        maxW="container.xl"
        py={8}
        display="flex"
        gap={8}
        flexWrap="wrap"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Card
          size="full"
          title="Mobile wallet for holders"
          subtitle="Everyone can download his own mobile wallet, where he can hold and enclose his verifiable credentials."
          image={MobileWalletImage}
        />
        <Card
          title="Platform for issuers"
          subtitle="Authorities can issue new credential to holders or create verification policies to test any claim that belongs to a schema in the SSI ecosystem."
          image={PlatformForIssuers}
        />
        <Card
          title="Platform for holders"
          subtitle="Holders can use the SSI platform to tranfer the credentails to their mobile wallet."
          image={PlatformForHolders}
        />
      </Container>
    </Box>
  )
}

export default HowItWorksSection
