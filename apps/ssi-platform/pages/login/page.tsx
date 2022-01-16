import {
  Flex,
  Box,
  Text,
  Input,
  VStack,
  Button,
  Container,
} from '@chakra-ui/react';
import Link from 'next/link';

interface LoginPageProps {
  onConnectWallet: () => void;
  onDownloadWallet: () => void;
  handleDidChange: (v: string) => void;
}

export const LoginPage = (props: LoginPageProps) => {
  return (
    <Container
      h={'100%'}
      maxH={500}
      maxW={'container.lg'}
      mt={[12, null, 24]}
      w={'100%'}
      mx={'auto'}
    >
      <Box
        rounded={'md'}
        px={[4, 12, 24]}
        py={[6, null, 12]}
        minH={400}
        w={'80%'}
        mx={'auto'}
        borderWidth={2}
        borderColor={'blackAlpha.400'}
        boxShadow={'lg'}
      >
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
          onChange={(e) => props.handleDidChange(e.target.value)}
        />
        <VStack h="100%" pt={8} spacing={8}>
          <Button
            w={'100%'}
            size="lg"
            colorScheme={'telegram'}
            bg={'blue.400'}
            p={[4, null, 8]}
            fontSize={['md', 'lg', '2xl']}
            onClick={props.onConnectWallet}
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
            onClick={props.onDownloadWallet}
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
      </Box>
    </Container>
  );
};
