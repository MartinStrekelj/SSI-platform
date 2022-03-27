import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import { SDR_STATUS } from '@ssi-ms/interfaces'
import CenteredBoxLayout from 'apps/ssi-platform/shared/components/layouts/CenteredBoxLayout'
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

  const handleConfirmProcessComplete = () => {}

  const startProcess = () => {
    console.log('process started')
  }

  let icon: FeatherIcon
  let buttonLabel: string
  let action: () => void
  switch (status) {
    case SDR_STATUS.REJECTED:
      icon = X
      buttonLabel = 'Verification process failed. Please try again!'
      action = () => setStatus(null)
      break
    case SDR_STATUS.APPROVED:
      icon = Check
      buttonLabel = 'Successfully completed verification process'
      action = () => setStatus(null)
      break
    case SDR_STATUS.PENDING:
      icon = HelpCircle
      buttonLabel = 'Confirm completed with verification'
      action = handleConfirmProcessComplete
      break
    default:
      icon = PlayCircle
      buttonLabel = 'Start verification process'
      action = startProcess
  }

  return (
    <VStack gap={4}>
      <FormControl>
        <FormLabel htmlFor="key">Enter verification policy key</FormLabel>
        <Input id="key" type="text" value={sdrKey} onChange={(e) => setKey(e.target.value)} />
        <FormHelperText>
          Please note that changing this value mid process will reset the verification process
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="key">SDR QR code</FormLabel>
        <img src={qrcode} alt="QR code will be generated here when you start process with a valid key" />
      </FormControl>
      <FormControl>
        <ButtonGroup size="lg" isAttached variant="outline" w={'100%'}>
          <IconButton isDisabled aria-label="Add to friends" icon={<Icon as={icon} />} />
          <Button w={'100%'} onClick={action} isDisabled={!sdrKey.length} mr="-px">
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

export default DemoForVerificationProcess
DemoForVerificationProcess.layout = CenteredBoxLayout
