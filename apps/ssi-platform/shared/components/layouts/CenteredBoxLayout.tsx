import { Box, Container, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { ChevronLeft, ChevronsLeft, X } from 'react-feather'

interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[]
}

const CenteredBoxLayout = ({ children }: ILayoutProps) => {
  const router = useRouter()
  const goHome = () => router.push('/')

  return (
    <Container h={'100%'} maxH={500} maxW={'container.lg'} mt={[12, null, 24]} w={'100%'} mx={'auto'}>
      <Icon as={ChevronLeft} _hover={{ cursor: 'pointer' }} w={8} h={8} position="absolute" onClick={goHome} />
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
        {children}
      </Box>
    </Container>
  )
}

export default CenteredBoxLayout
