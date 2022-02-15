import { Flex, Text } from '@chakra-ui/react'
import { IListCredentialsDTO } from '@ssi-ms/interfaces'
import React from 'react'
import { useCredentials } from '../../Api/CredentialsApi'
import { FullPageLoader } from '../loaders/fullpage'
import { Credential } from './index'

export const CredentialsList = () => {
  const { data, isLoading, isError } = useCredentials()

  if (isLoading) {
    return <FullPageLoader relative />
  }

  if (isError) {
    return <Text>Something went wrong when retrieving your credentials!</Text>
  }

  const { credentials } = data as IListCredentialsDTO

  if (credentials.length <= 0) {
    return <Text>You have no credentials for this account</Text>
  }

  return (
    <Flex
      flexDirection={['column', null, 'row']}
      justifyContent={['flex-start']}
      alignItems={['center', null, 'flex-start']}
      spacing="30px"
      w={'100%'}
    >
      {credentials.map((credential) => (
        <Credential isLink key={credential.id} credential={credential} />
      ))}
    </Flex>
  )
}
