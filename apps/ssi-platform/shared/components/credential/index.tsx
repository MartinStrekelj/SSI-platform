import React from 'react'
import { Box, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import Link from 'next/link'
import { ConditionalWrapper } from '../conditionalwrapper'
import Logo from '../logo'

const CREDENTIAL_SIZE = {
  HEIGHT: 270,
  WIDTH: 420,
}

interface ICredentialProps {
  credential: IVerifiableCredentialDTO
  isLink?: boolean
}

export const Credential = ({ credential, isLink = false }: ICredentialProps) => {
  return (
    <ConditionalWrapper
      condition={isLink}
      wrapper={(children: React.ReactNode) => (
        <LinkBox _hover={{ cursor: 'pointer' }}>
          <Link passHref href={`/dashboard/credentials/${credential.id}`}>
            <LinkOverlay>{children}</LinkOverlay>
          </Link>
        </LinkBox>
      )}
    >
      <Flex
        flexGrow={1}
        w={CREDENTIAL_SIZE.WIDTH}
        h={CREDENTIAL_SIZE.HEIGHT}
        bgGradient="linear(to-r, primary.500, primary.300)"
        p={4}
        rounded={'2xl'}
        m={2}
        position="relative"
        alignItems={'flex-end'}
      >
        <Box position={'absolute'} left={4} top={4}>
          <Logo white />
        </Box>

        {/* <Flex w="100%" h={'50%'} bg={'white'}></Flex> */}
      </Flex>
    </ConditionalWrapper>
  )
}
