import React, { useState } from 'react'
import { useLoginAttemptContext, LoginContextProvider } from 'apps/ssi-platform/shared/lib/LoginAttemptContext'
import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout'
import { Flex, Input, VStack, Button, Heading } from '@chakra-ui/react'

export const Login = () => {
  const [publicDID, updatePublicDid] = useState<string>('')
  const { onConnectWallet, onDownloadWallet } = useLoginAttemptContext()
  return (
    <>
      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'flex-start'} mb={4}>
        <Heading fontSize={['2xl', null, '4xl']}>Enter SSI Platform application</Heading>
      </Flex>
      <Input
        size={'lg'}
        variant={'flushed'}
        placeholder="Insert your DID here"
        onChange={(e) => updatePublicDid(e.target.value)}
      />
      <VStack h="100%" pt={8} spacing={8}>
        <Button
          w={'100%'}
          size="lg"
          variant={'primary'}
          p={[4, null, 8]}
          fontSize={['md', 'lg', '2xl']}
          onClick={() => onConnectWallet(publicDID)}
        >
          Connect with wallet
        </Button>
        <Button
          w={'100%'}
          size="lg"
          variant={'ghost'}
          p={[4, null, 8]}
          fontSize={['md', 'lg', '2xl']}
          onClick={onDownloadWallet}
        >
          Download mobile wallet
        </Button>
      </VStack>
    </>
  )
}

export default Login
Login.provider = LoginContextProvider
Login.layout = CenteredBoxLayout
