import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
} from '@chakra-ui/react';
import { CLAIM_TYPES, IClaim } from '@ssi-ms/interfaces';
import { useFormik } from 'formik';
import { generateRandomNumberId } from '@ssi-ms/utils';

interface IAddClaimModelProps {
  open: boolean;
  onClose: () => void;
  onSave: (newClaim: IClaim) => void;
  onRemove: (removedClaim: IClaim) => void;
  claim?: IClaim;
}

export const ClaimsModal = ({
  open,
  onClose,
  onSave,
  claim = null,
  onRemove,
}: IAddClaimModelProps) => {
  const formik = useFormik({
    initialValues: {
      id: claim ? claim.id : Date.now(),
      type: claim ? claim.type : CLAIM_TYPES.EQUALS,
      title: claim ? claim.title : '',
      value: claim ? claim.value : '',
    },
    onSubmit: (values) => {
      if (formik.dirty) {
        onSave(values);
      }

      formik.resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({
      id: claim ? claim.id : Date.now(),
      type: claim ? claim.type : CLAIM_TYPES.EQUALS,
      title: claim ? claim.title : '',
      value: claim ? claim.value : '',
    });
  }, [claim]);

  return (
    <Modal
      blockScrollOnMount
      isOpen={open}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{claim !== null ? 'Edit Claim' : 'Add Claim'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="value">Value</FormLabel>
              <Input
                id="value"
                type="text"
                name="value"
                value={formik.values.value}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="type">Claim type</FormLabel>
              <Select
                name="type"
                placeholder={'Select one...'}
                onChange={formik.handleChange}
                value={formik.values.type}
              >
                {Object.values(CLAIM_TYPES).map((claim: string) => (
                  <option key={claim} value={claim}>
                    {claim}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {claim !== null && (
            <Button colorScheme="red" mr={3} onClick={() => onRemove(claim)}>
              Delete
            </Button>
          )}
          <Button variant="solid" onClick={formik.submitForm}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
