import { Flex, Heading, Icon, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { Check } from 'react-feather'

const Steps = () => {
  return (
    <Flex flexDir={'column'} h="100%" flexGrow={1}>
      <Heading
        id="howToStart"
        color={'black'}
        textAlign={['center', 'center', 'left', 'left']}
        fontSize={['4xl', '4xl', '4xl', '6xl']}
      >
        How to start
      </Heading>
      <List spacing={8} py={4}>
        <ListItem fontWeight={'500'} fontSize="lg" display={'flex'} alignItems="center">
          <ListIcon w={8} h={8} as={Check} color="green.500" />
          Download the mobile application and follow the onboarding process.
        </ListItem>
        <ListItem fontWeight={'500'} fontSize="lg" display={'flex'} alignItems="center">
          <ListIcon w={8} h={8} as={Check} color="green.500" />
          Enter dashboard with your generated public DID key. Use your mobile wallet as a scanner for communication
          between the wallet and the platfrom.
        </ListItem>
        <ListItem fontWeight={'500'} fontSize="lg" display={'flex'} alignItems="center">
          <ListIcon w={8} h={8} as={Check} color="green.500" />
          Transfer credentials to your wallet, from where you can enclose and attach them to any public system that
          request verifiable information.
        </ListItem>
        <ListItem fontWeight={'500'} fontSize="lg" display={'flex'} alignItems="center">
          <ListIcon w={8} h={8} as={Check} color="green.500" />
          Note that data is now in your control. You can only share as much data as it is required to verify the
          integrity of your information.
        </ListItem>
      </List>
    </Flex>
  )
}

export default Steps
