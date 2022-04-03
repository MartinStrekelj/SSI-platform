import { Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { ChevronRight } from 'react-feather'

export const LandingCTA = () => {
  return (
    <Flex w={['100%', null, '49%']} flexDirection="column">
      <Heading
        bgGradient="linear(to-r, primary.500, secondary.500)"
        bgClip="text"
        fontSize={['5xl', '6xl']}
        fontWeight="extrabold"
        textTransform={'capitalize'}
        mb={4}
      >
        Self-sovereign identity platform
      </Heading>
      <Text fontWeight="500" fontSize={['xl', '2xl']} mb={8}>
        Join users of decentralized system, where your data and credentials are <b> managed </b> using crypto wallet and
        <b> verified </b>
        using public-key cryptography anchored on a distributed ledger.
      </Text>
      <Flex gap={4} flexWrap="wrap-reverse">
        <Button variant={'ghost'} size={'lg'}>
          Show me where to start
        </Button>
        <Button rightIcon={<Icon as={ChevronRight} />} variant={'primary'} size={'lg'}>
          Enter dashboard
        </Button>
      </Flex>
    </Flex>
  )
}
