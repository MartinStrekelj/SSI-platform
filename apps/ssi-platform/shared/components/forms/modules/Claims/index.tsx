import {
  FormControl,
  FormLabel,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ClaimsModal } from './ClaimsModal';
import { AddClaimsBox, ClaimsBox } from './ClaimsBox';
import { FormikValues } from 'formik';
import { IClaim } from '@ssi-ms/interfaces';
import produce from 'immer';

interface IClaimsModuleProps {
  formik: FormikValues;
}

export const ClaimsFormModule = ({ formik }: IClaimsModuleProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClaim, setSelectedClaim] = useState<null | IClaim>(null);

  const onEditModalOpen = (claim: IClaim) => {
    setSelectedClaim(claim);
    onOpen();
  };

  const onCloseModal = () => {
    setSelectedClaim(null);
    onClose();
  };

  const addClaim = (newClaim: IClaim) => {
    formik.values.claims = produce(formik.values.claims, (draft: IClaim[]) => {
      draft.push(newClaim);
    });
    onClose();
  };

  const editClaim = (editClaim: IClaim) => {
    formik.values.claims = produce(formik.values.claims, (draft: IClaim[]) => {
      const index = draft.findIndex((claim) => claim.id === editClaim.id);
      if (index !== -1)
        draft[index] = {
          ...editClaim,
        };
    });
    onClose();
  };

  const removeClaim = (removedClaim: IClaim) => {
    formik.values.claims = produce(formik.values.claims, (draft: IClaim[]) => {
      const index = draft.findIndex((claim) => claim.id === removedClaim.id);
      if (index !== -1) draft.splice(index, 1);
    });
    onClose();
  };

  const renderModal = () => {
    let action = addClaim;
    if (selectedClaim !== null) {
      action = editClaim;
    }

    return (
      <ClaimsModal
        claim={selectedClaim}
        open={isOpen}
        onClose={onCloseModal}
        onSave={action}
        onRemove={removeClaim}
      />
    );
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="claims">Claims</FormLabel>
        <SimpleGrid columns={[1, 2, 3]} spacing={2}>
          {formik.values.claims.map((claim: IClaim) => (
            <ClaimsBox claim={claim} key={claim.id} onEdit={onEditModalOpen} />
          ))}
          <AddClaimsBox onClick={onOpen} />
        </SimpleGrid>
      </FormControl>
      {renderModal()}
    </>
  );
};
