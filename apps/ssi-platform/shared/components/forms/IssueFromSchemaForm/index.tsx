import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Box,
} from '@chakra-ui/react'
import { CLAIM_TYPES, IClaim, IClaimValueTypes, IIdentity, IVerifiableCredentialDTO } from '@ssi-ms/interfaces'

import { useSchemas } from 'apps/ssi-platform/shared/Api/SchemasApi'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Loader, ChevronDown } from 'react-feather'
import { TableWidget } from '../../widgets/table'
import { FormActions } from '../modules/FormActions'
import FormBody from '../modules/FormBody'
import produce from 'immer'
import { useSchemaFields } from 'apps/ssi-platform/shared/hooks/useSchemaFields'

interface IIssueFromSchemaProps {
  isSubmitting: boolean
  authority: IIdentity
  onSubmit: (vc: IVerifiableCredentialDTO) => void
}

export const IssueFromSchemaForm = ({
  isSubmitting,
  authority,
  onSubmit: submitCredentialRequest,
}: IIssueFromSchemaProps) => {
  const { data, isLoading, isError } = useSchemas()
  const [claimFields, setFields] = useState<(React.ReactNode | string)[][] | undefined>(undefined)
  const dataReady = !isLoading && !isError
  const { createSchemaFieldsFromSchema } = useSchemaFields()

  const formik = useFormik({
    initialValues: {
      issuer: authority.metadata.alias,
      schema: '',
      subject: '',
      expiryDate: undefined,
      type: '', // Type of credential -> eg. Dokazilo o statusu izjemnega športnika
      claims: [],
    },

    onSubmit: (values) => {
      if (!formik.dirty) {
        return
      }

      const dto: IVerifiableCredentialDTO = {
        ...values,
        issuer: authority.did,
      }

      submitCredentialRequest(dto)
    },
  })

  const handleOnSchemaChange = (schemaId: string) => {
    if (!!formik.values.schema) {
      resetSchemaFields()
    }
    formik.setFieldValue('schema', schemaId)
  }

  const resetSchemaFields = () => {
    formik.setFieldValue('claims', [])
    setFields(undefined)
  }

  useEffect(() => {
    if (!formik.values.schema) {
      resetSchemaFields()
      return
    }
    const { schema: schemaId } = formik.values

    const selectedSchema = data.schemas.find((schema) => schema.id === schemaId)

    const { schemaFields, emptyClaimsFields } = createSchemaFieldsFromSchema({
      schema: selectedSchema,
      handleClaimValueChange,
    })

    formik.values.claims = emptyClaimsFields
    setFields(schemaFields)
  }, [formik.values.schema])

  const handleClaimValueChange = (idx: number, newValue: IClaimValueTypes) => {
    const updatedClaims = produce(formik.values.claims, (draft: IClaim[]) => {
      if (idx !== -1) {
        draft[idx] = {
          ...draft[idx],
          value: newValue,
        }
      }
    })

    formik.values.claims = updatedClaims
    formik.setFieldValue('claims', updatedClaims)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormBody>
        <FormControl isRequired>
          <FormLabel>Selected schema</FormLabel>
          <Select
            onChange={(e) => handleOnSchemaChange(e.target.value)}
            placeholder="Select a predefined schema..."
            icon={isLoading ? <Icon as={Loader} /> : <Icon as={ChevronDown} />}
          >
            {dataReady &&
              data.schemas.map((schema) => (
                <option key={schema.id} value={schema.id}>
                  {schema.title}
                </option>
              ))}
          </Select>
        </FormControl>
        {!!formik.values.schema && (
          <>
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
          </>
        )}
        {claimFields && (
          <Box w="100%">
            <TableWidget head={['title', 'value']} body={claimFields} />
          </Box>
        )}
        <FormActions
          handleReset={formik.handleReset}
          isSubmitting={isSubmitting}
          submitLabel={'Create new credential'}
        />
      </FormBody>
    </form>
  )
}
