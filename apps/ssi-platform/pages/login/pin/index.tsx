import React, { useEffect } from 'react'
import { Button, HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react'
import { PIN_LENGTH } from '@ssi-ms/utils'
import Link from 'next/link'

import { useLoginAttemptContext, LoginContextProvider } from 'apps/ssi-platform/shared/lib/LoginAttemptContext'
import { useRouter } from 'next/router'
import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout'

const Pin = () => {
  const { qrcode, userDID, handleEnteredPin } = useLoginAttemptContext()
  const router = useRouter()

  // Go back to initial step if no qrcode present
  useEffect(() => {
    if (qrcode === undefined || userDID === undefined) {
      router.push('/login')
    }
  }, [])

  return (
    <VStack>
      <Text fontSize={['2xl', null, '4xl']}>Enter PIN</Text>
      <Text fontSize={['lg', null, 'xl']}>Scan this QR code and enter the PIN</Text>
      <img src={qrcode} />
      <HStack>
        <PinInput
          type="alphanumeric"
          colorScheme={'telegram'}
          variant={'filled'}
          otp
          size={'lg'}
          onComplete={(value: string) => handleEnteredPin(value)}
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
  )
}

export default Pin
Pin.provider = LoginContextProvider
Pin.layout = CenteredBoxLayout
