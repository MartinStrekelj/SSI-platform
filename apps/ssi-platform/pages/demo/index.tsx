import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import { SDR_COMPLETED, SDR_STATUS } from '@ssi-ms/interfaces'
import {
  confirmPolicyVerificationProcess,
  startPolicyVerificationProcess,
} from 'apps/ssi-platform/shared/Api/CredentialsApi'
import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout'
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts'
import React, { useEffect, useState } from 'react'
import { Check, HelpCircle, Icon as FeatherIcon, PlayCircle, X } from 'react-feather'

/**
 * This page is 'officially' not a part of the platform
 * but rather a showcase of potential
 * practical use of verification policies
 */
const DemoForVerificationProcess = () => {
  const [sdrKey, setKey] = useState<string>('')
  const [qrcode, setQR] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [status, setStatus] = useState<SDR_STATUS | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { dangerToast, successToast, infoToast } = useToasts()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const key = urlParams.get('key')
    if (!!key) {
      setKey(key)
    }
    return () => setKey('')
  }, [])

  // reset state if sdr key changes
  useEffect(() => {
    if (qrcode.length || id.length) {
      setQR('')
      setId('')
      setStatus(null)
    }
  }, [sdrKey])

  const handleConfirmProcessComplete = async () => {
    setLoading(true)
    const response = await confirmPolicyVerificationProcess(id)
    setLoading(false)

    if (!response.ok) {
      dangerToast({ description: response.message })
      return setStatus(SDR_STATUS.REJECTED)
    }

    if (response.message === SDR_STATUS.PENDING) {
      return infoToast({
        description:
          'The verification request is still pending, please follow the instructions to continue with the process',
      })
    }

    successToast({})
    setStatus(SDR_STATUS.APPROVED)
  }

  const startProcess = async () => {
    setLoading(true)
    const response = await startPolicyVerificationProcess(sdrKey)
    setLoading(false)

    if (!response.ok) {
      dangerToast({ description: 'Something went wrong when starting the proccess. Try again!' })
      return
    }

    successToast({})
    setQR(response.qrcode)
    setId(response.id)
    setStatus(SDR_STATUS.PENDING)
  }

  const finishProcess = () => {
    setStatus(null)
    setQR('')
    setId('')
    setKey('')
  }

  let icon: FeatherIcon
  let buttonLabel: string
  let action: () => void
  switch (status) {
    case SDR_STATUS.REJECTED:
      icon = X
      buttonLabel = 'Verification process failed. Please try again!'
      action = finishProcess
      break
    case SDR_STATUS.APPROVED:
      icon = Check
      buttonLabel = 'Successfully completed verification process'
      action = finishProcess
      break
    case SDR_STATUS.PENDING:
      icon = HelpCircle
      buttonLabel = 'Confirm completion of verification process'
      action = handleConfirmProcessComplete
      break
    default:
      icon = PlayCircle
      buttonLabel = 'Start verification process'
      action = startProcess
  }

  return (
    <VStack gap={4}>
      <FormControl isDisabled={status !== null}>
        <FormLabel htmlFor="key">Enter verification policy key</FormLabel>
        <Input id="key" type="text" value={sdrKey} onChange={(e) => setKey(e.target.value)} />
      </FormControl>
      {SDR_COMPLETED.includes(status) ? (
        <CompletedNotification state={status} />
      ) : (
        <FormControl>
          <FormLabel htmlFor="key">Verification request QR Code</FormLabel>
          <Flex justify={'center'} alignItems={'center'}>
            <img src={qrcode} alt="QR code will be generated here when you start process with a valid policy key" />
          </Flex>
        </FormControl>
      )}

      <FormControl>
        <ButtonGroup size="lg" isAttached variant="outline" w={'100%'}>
          <IconButton isDisabled aria-label="Add to friends" icon={<Icon as={icon} />} />
          <Button isLoading={isLoading} w={'100%'} onClick={action} isDisabled={!sdrKey.length} mr="-px">
            {buttonLabel}
          </Button>
        </ButtonGroup>
        {status === SDR_STATUS.PENDING && (
          <FormHelperText>
            Scan QR code and finish the verification process with you wallet. When done click the button again to finish
            the process.
          </FormHelperText>
        )}
      </FormControl>
    </VStack>
  )
}

const CompletedNotification = ({ state }) => {
  const isApproved = state === SDR_STATUS.APPROVED
  return (
    <Flex
      w={'100%'}
      h={300}
      bg={isApproved ? 'green.500' : 'red.500'}
      justify={'center'}
      alignItems={'center'}
      color={'white'}
      rounded={'md'}
    >
      <Icon as={isApproved ? Check : X} w={24} h={24} />
    </Flex>
  )
}

export default DemoForVerificationProcess
DemoForVerificationProcess.layout = CenteredBoxLayout
