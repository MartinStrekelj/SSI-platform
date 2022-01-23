import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout';
import React from 'react';
import {
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from '@chakra-ui/react';
import { PIN_LENGTH } from '@ssi-ms/utils';
import Link from 'next/link';

interface PinPageProps {
  qrcode: string;
  onPinEntered: (pin: string) => void;
}

export const PinPage = ({ qrcode, onPinEntered }: PinPageProps) => {
  return (
    <CenteredBoxLayout>
      <VStack>
        <Text fontSize={['2xl', null, '4xl']}>Welcome_title</Text>
        <Text fontSize={['lg', null, 'xl']}>Welcome_description</Text>
        <img src={qrcode} />
        <HStack>
          <PinInput
            type="alphanumeric"
            colorScheme={'telegram'}
            variant={'filled'}
            otp
            size={'lg'}
            onComplete={(value: string) => onPinEntered(value)}
          >
            {[...Array(PIN_LENGTH)].map((_e, i) => (
              <PinInputField key={i} textTransform={'uppercase'} />
            ))}
          </PinInput>
        </HStack>
        <Link href={'/login'}>
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
    </CenteredBoxLayout>
  );
};
