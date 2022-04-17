import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

interface IRevokeCredentialsProps {
  onRevokeCredential: (reason: string) => Promise<void>
}

export const RevokeCredential = ({ onRevokeCredential }: IRevokeCredentialsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [reason, setReason] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const cancelRef = useRef()

  const onConfirm = async () => {
    setLoading(true)
    await onRevokeCredential(reason)
    setLoading(false)
    setReason('')
    onClose()
  }

  return (
    <>
      <Button size={'lg'} onClick={onOpen} mb={4}>
        Revoke
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Revoke verifiable credential
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You <strong>can't</strong> undo this action afterwards.
              <Input my={2} placeholder="Reason for revoking..." onChange={(e) => setReason(e.target.value)} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3} isLoading={isLoading}>
                Revoke
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
