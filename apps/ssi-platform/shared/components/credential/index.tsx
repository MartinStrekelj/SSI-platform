import React from 'react'
import { Box, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import Link from 'next/link'
import { ConditionalWrapper } from '../conditionalwrapper'

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
      <Box
        maxW={CREDENTIAL_SIZE.WIDTH}
        minH={CREDENTIAL_SIZE.HEIGHT}
        bgGradient="linear(to-r, green.200, green.300)"
        p={4}
        rounded={'2xl'}
        m={2}
      >
        {JSON.stringify(credential)}
      </Box>
    </ConditionalWrapper>
  )
}
