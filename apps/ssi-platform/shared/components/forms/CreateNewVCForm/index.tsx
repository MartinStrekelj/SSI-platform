import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  VStack,
} from '@chakra-ui/react'
import { IClaim, IIdentity, IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import React from 'react'
import { useFormik } from 'formik'
import { Plus, Repeat } from 'react-feather'
import { ClaimsFormModule } from '../modules/Claims'

interface ICreateNewVCFormProps {
  issuer: IIdentity
  submitForm: (values: IVerifiableCredentialDTO) => void
  isSubmitting: boolean
}

export const CreateNewVCForm = ({ issuer, submitForm, isSubmitting = false }: ICreateNewVCFormProps) => {
  const formik = useFormik({
    initialValues: {
      issuer: issuer.metadata.alias,
      subject: '',
      expiryDate: undefined,
      type: '', // Type of credential -> eg. Dokazilo o statusu izjemnega športnika
      claims: [],
    },

    onSubmit: (values) => {
      if (!formik.dirty) {
        return
      }

      const claimDTOs: IClaim[] = values.claims.map((claim) => {
        const { id, ...claimValues } = claim // omit id
        return claimValues
      })

      const payload: IVerifiableCredentialDTO = {
        issuer: issuer.did,
        subject: values.subject,
        type: values.type,
        expiryDate: values.expiryDate,
        claims: claimDTOs,
      }

      return submitForm(payload)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* FORM VALUES */}
      <VStack gap={4} w={'100%'} maxW={750}>
        <FormControl isRequired isDisabled>
          <FormLabel htmlFor="issuer">Issuer</FormLabel>
          <Input id="issuer" type="text" name="issuer" value={formik.values.issuer} />
          <FormHelperText>Issuer of the VC</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <Input id="to" name="subject" value={formik.values.subject} onChange={formik.handleChange} type="text" />
          <FormHelperText>Receiver of VC</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Input id="type" type="text" name="type" value={formik.values.type} onChange={formik.handleChange} />
          <FormHelperText>Type of credentials</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="expiryDate">Expiry date</FormLabel>
          <Input
            id="expiryDate"
            type="date"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
          />
          <FormHelperText>Expiry date for the VC</FormHelperText>
        </FormControl>
        <ClaimsFormModule formik={formik} />

        {/* Submit button */}

        <Divider />
        <ButtonGroup w={['100%', null, 'fit-content']} alignSelf={'flex-end'} flexWrap={'wrap-reverse'} gap={4}>
          <Button
            onClick={formik.handleReset}
            w={['100%', null, 'fit-content']}
            type="reset"
            size="lg"
            rightIcon={<Icon as={Repeat} />}
            fontSize={['md', 'lg', 'xl']}
          >
            Reset form
          </Button>
          <Button
            isLoading={isSubmitting}
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
  )
}
