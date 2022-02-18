import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
  Center,
} from '@chakra-ui/react'

interface ITrasferCredentialProps {
  credentialTransferCode?: string | undefined
  onOpen?: () => void
  onClose?: () => void
}

export const TransferCredentialModal = ({ credentialTransferCode, onOpen, onClose }: ITrasferCredentialProps) => {
  const modalActions = useDisclosure()

  const handleOpenModal = () => {
    if (onOpen) onOpen()
    modalActions.onOpen()
  }

  const handleOnClose = () => {
    if (onClose) onClose()
    modalActions.onClose()
  }

  return (
    <>
      <Button onClick={handleOpenModal}>Open Modal</Button>

      <Modal isOpen={modalActions.isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan me</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>{credentialTransferCode ? <img src={credentialTransferCode} /> : <Spinner />}</Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
