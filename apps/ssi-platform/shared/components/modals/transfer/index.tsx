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
  label?: string
}

export const TransferCredentialModal = ({
  credentialTransferCode,
  onOpen,
  onClose,
  label = 'Transfer credential',
}: ITrasferCredentialProps) => {
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
      <Button size={'lg'} onClick={handleOpenModal}>
        {label}
      </Button>

      <Modal isOpen={modalActions.isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={2}>
            <Center>{credentialTransferCode ? <img src={credentialTransferCode} /> : <Spinner />}</Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
