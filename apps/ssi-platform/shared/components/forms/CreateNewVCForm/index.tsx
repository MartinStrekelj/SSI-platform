import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  SimpleGrid,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CLAIM_TYPES, IClaim, IIdentity } from '@ssi-ms/interfaces';
import React from 'react';
import { useFormik } from 'formik';
import { Plus, Repeat } from 'react-feather';
import { ClaimsFormModule } from '../modules/Claims';

interface ICreateNewVCFormProps {
  issuer: IIdentity;
}

export const CreateNewVCForm = ({ issuer }: ICreateNewVCFormProps) => {
  const formik = useFormik({
    initialValues: {
      issuer: issuer.metadata.alias,
      subject: '',
      expiryDate: null,
      type: CLAIM_TYPES.EQUALS,
      claims: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack gap={4} w={'100%'} maxW={750}>
        <FormControl isRequired isDisabled>
          <FormLabel htmlFor="issuer">Issuer</FormLabel>
          <Input id="issuer" type="text" value={formik.values.issuer} />
          <FormHelperText>Issuer of the VC</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <Input id="to" type="text" />
          <FormHelperText>Receiver of VC</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="expiryDate">Expiry date</FormLabel>
          <Input id="expiryDate" type="date" />
          <FormHelperText>Expiry date for the VC</FormHelperText>
        </FormControl>
        <ClaimsFormModule formik={formik} />
        <Divider />
        <ButtonGroup
          w={['100%', null, 'fit-content']}
          alignSelf={'flex-end'}
          flexWrap={'wrap-reverse'}
          gap={4}
        >
          <Button
            w={['100%', null, 'fit-content']}
            type="submit"
            size="lg"
            rightIcon={<Icon as={Repeat} />}
            fontSize={['md', 'lg', 'xl']}
          >
            Reset form
          </Button>
          <Button
            w={['100%', null, 'fit-content']}
            type="submit"
            size="lg"
            rightIcon={<Icon as={Plus} />}
            fontSize={['md', 'lg', 'xl']}
          >
            Create new credential
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};
