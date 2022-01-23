import { Box, Container } from '@chakra-ui/react';
import React from 'react';

interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const CenteredBoxLayout = ({ children }: ILayoutProps) => {
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
        {children}
      </Box>
    </Container>
  );
};

export default CenteredBoxLayout;
