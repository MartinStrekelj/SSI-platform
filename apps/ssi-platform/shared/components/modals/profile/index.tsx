import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { IIdentity } from '@ssi-ms/interfaces'
import React, { useState } from 'react'
import { LogOut } from 'react-feather'

interface IProfileInfoProps {
  profile: IIdentity
  logout: () => Promise<void>
}

const Profile = ({ profile, logout }: IProfileInfoProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setLoading] = useState<boolean>(false)

  const onLogoutClick = async () => {
    setLoading(true)
    await logout()
  }

  return (
    <>
      <Tooltip label="See public information about identity" aria-label="A tooltip" placement="left-end">
        <Avatar size={'md'} bg="primary.500" _hover={{ cursor: 'pointer' }} onClick={onOpen} />
      </Tooltip>

      <Modal blockScrollOnMount isOpen={isOpen} onClose={isLoading ? undefined : onClose} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton disabled={isLoading} />
          <ModalBody display={'flex'} gap={4} flexDirection="column">
            <Flex justifyContent={'center'}>
              <Avatar size={'lg'} bg="primary.500" />
            </Flex>
            <Heading userSelect={'none'} textAlign={'center'}>
              {profile.metadata.alias}
            </Heading>
            <Heading size={'md'} textAlign="center" textTransform={'uppercase'}>
              {profile.metadata.role.join(', ')}
            </Heading>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center" alignItems="center">
            <Button
              isLoading={isLoading}
              textTransform={'uppercase'}
              rightIcon={<Icon as={LogOut} />}
              onClick={onLogoutClick}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Profile
