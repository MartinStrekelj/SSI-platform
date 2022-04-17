import { Button, Container, Divider, Flex, Icon, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { ChevronRight, GitHub } from 'react-feather'
import { GITHUB_LINK } from '..'
import Logo from '../../logo'

const Footer = () => {
  const router = useRouter()
  return (
    <>
      <Container as="footer" py={4} maxW="container.xl" mx={'auto'}>
        <Divider />
        <Flex
          w="100%"
          h="100%"
          gap={8}
          py={8}
          alignItems="center"
          justifyContent={'space-between'}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Logo />
          <Flex flexDirection={'column'} gap={4}>
            <Button rightIcon={<Icon as={GitHub} />} as={'a'} href={GITHUB_LINK} variant={'github'}>
              See Github
            </Button>
            <Button rightIcon={<Icon as={ChevronRight} />} variant={'primary'} onClick={() => router.push('/login/')}>
              Enter dashboard
            </Button>
          </Flex>
        </Flex>
      </Container>
      <Box w={'100%'} bg={'gray.200'} textAlign="center" p={2}>
        Made with &hearts; by Martin Štrekelj
      </Box>
    </>
  )
}

export default Footer
