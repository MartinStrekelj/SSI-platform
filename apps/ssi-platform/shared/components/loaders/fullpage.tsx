import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

export const FullPageLoader = () => {
  return (
    <Center
      top={0}
      right={0}
      left={0}
      bottom={0}
      h={'100%'}
      w={'100%'}
      zIndex={100}
      position={'absolute'}
      bg={'white'}
    >
      <Spinner size={'xl'} />
    </Center>
  );
};
