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
import { CLAIM_TYPES } from '@ssi-ms/interfaces'

import { useSchemas } from 'apps/ssi-platform/shared/Api/SchemasApi'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Loader, ChevronDown } from 'react-feather'
import { TableWidget } from '../../widgets/table'
import { FormActions } from '../modules/FormActions'
import FormBody from '../modules/FormBody'

export const IssueFromSchemaForm = () => {
  const { data, isLoading, isError } = useSchemas()
  const [claimFields, setFields] = useState<(React.ReactNode | string)[][] | undefined>(undefined)
  const dataReady = !isLoading && !isError

  const formik = useFormik({
    initialValues: {
      issuer: '',
      schema: '',
      subject: '',
      expiryDate: undefined,
      type: '', // Type of credential -> eg. Dokazilo o statusu izjemnega športnika
      claims: [],
    },
    onSubmit: (values) => {
      console.log(values)
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
    const schemaFields: (React.ReactNode | string)[][] = selectedSchema.fields.data.reduce(
      (acc, field, idx: number) => {
        let component: React.ReactNode
        switch (field.type) {
          case CLAIM_TYPES.CHECKBOX:
            component = <Checkbox isChecked={false} />
            break
          case CLAIM_TYPES.NUMERIC:
            component = (
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )
          default:
            break
        }

        if (!component) {
          return acc
        }

        return [...acc, [field.title, component]]
      },
      []
    )
    const initClaims: string[] = [...schemaFields.map((schemaField) => schemaField[0])] as string[]
    formik.setFieldValue('claims', initClaims)
    setFields(schemaFields)
  }, [formik.values.schema])

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
          </>
        )}
        {claimFields && (
          <Box w="100%">
            <TableWidget head={['title', 'field']} body={claimFields} />
          </Box>
        )}
        <FormActions handleReset={formik.handleReset} isSubmitting={false} submitLabel={'Create new credential'} />
      </FormBody>
    </form>
  )
}
