import React from 'react'
import { Box, Flex, Heading, Icon, IconButton, LinkBox, LinkOverlay, Tooltip } from '@chakra-ui/react'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import Link from 'next/link'
import { ConditionalWrapper } from '../conditionalwrapper'
import Logo from '../logo'
import { AlertTriangle } from 'react-feather'

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

        <RevokeWarning isRevoked={credential.isRevoked} />

        <Flex w="100%" h={'50%'} bg={'white'} rounded="base" p={4} alignItems="center">
          <Heading fontSize={['2xl', '4xl']}>{credential.type}</Heading>
        </Flex>
      </Flex>
    </ConditionalWrapper>
  )
}

const RevokeWarning = ({ isRevoked }: { isRevoked: boolean }) => {
  if (!isRevoked) {
    return null
  }

  return (
    <Tooltip label="This credential was revoked" aria-label="A tooltip">
      <IconButton
        position={'absolute'}
        top={4}
        right={4}
        p={2}
        variant="ghost"
        rounded="full"
        aria-label="revoke-warning"
        icon={<Icon as={AlertTriangle} w={6} h={6} />}
      />
    </Tooltip>
  )
}
