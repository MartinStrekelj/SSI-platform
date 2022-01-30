import React, { useState } from 'react';
import {
  useLoginAttemptContext,
  LoginContextProvider,
} from 'apps/ssi-platform/shared/lib/LoginAttemptContext';
import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout';
import { Flex, Text, Input, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';

export const Login = () => {
  const [publicDID, updatePublicDid] = useState<string>('');
  const { onConnectWallet, onDownloadWallet } = useLoginAttemptContext();
  return (
    <>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        mb={4}
      >
        <Text fontSize={['2xl', null, '4xl']}>Welcome_title</Text>
        <Text fontSize={['lg', null, 'xl']}>Welcome_description</Text>
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
          colorScheme={'telegram'}
          bg={'blue.400'}
          p={[4, null, 8]}
          fontSize={['md', 'lg', '2xl']}
          onClick={() => onConnectWallet(publicDID)}
        >
          Connect with wallet
        </Button>
        <Button
          w={'100%'}
          size="lg"
          variant={'outline'}
          colorScheme={'telegram'}
          p={[4, null, 8]}
          fontSize={['md', 'lg', '2xl']}
          onClick={onDownloadWallet}
        >
          Download mobile wallet
        </Button>
        <Link href={'/'}>
          <Button
            as="a"
            size="md"
            cursor={'pointer'}
            variant={'link'}
            colorScheme={'telegram'}
            p={[4, null, 8]}
            fontSize={['sm', 'md', 'xl']}
          >
            Go back
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default Login;
Login.provider = LoginContextProvider;
Login.layout = CenteredBoxLayout;
