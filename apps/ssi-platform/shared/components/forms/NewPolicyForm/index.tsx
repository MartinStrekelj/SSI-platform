import { Box, FormControl, FormLabel, Icon, Input, Select } from '@chakra-ui/react'
import { COMPARISON_TYPE, IClaim, IClaimValueTypes, IIdentity, IVerificationPolicyDTO } from '@ssi-ms/interfaces'
import { useSchemas } from 'apps/ssi-platform/shared/Api/SchemasApi'
import { useSchemaFields } from 'apps/ssi-platform/shared/hooks/useSchemaFields'
import { useFormik } from 'formik'
import produce from 'immer'
import React, { useEffect, useState } from 'react'
import { ChevronDown, Loader } from 'react-feather'
import { TableWidget } from '../../widgets/table'
import { FormActions } from '../modules/FormActions'
import FormBody from '../modules/FormBody'

interface INewPolicyProps {
  verifier: IIdentity
  isSubmitting?: boolean
  handleSubmit: (policy: IVerificationPolicyDTO) => void
}

export const NewPolicyForm = ({ verifier, isSubmitting, handleSubmit }: INewPolicyProps) => {
  const { data, isLoading, isError } = useSchemas()
  const [claimFields, setFields] = useState<(React.ReactNode | string)[][] | undefined>(undefined)
  const [disabledClaims, setDisabledClaims] = useState<number[]>([])
  const dataReady = !isLoading && !isError
  const { createSchemaFieldsFromSchema } = useSchemaFields()

  const formik = useFormik({
    initialValues: {
      schema: '',
      verifier: verifier.metadata.alias,
      claims: [],
    },
    onSubmit: (values) => {
      if (!formik.dirty) {
        return
      }

      const dto: IVerificationPolicyDTO = {
        issuer: verifier.did,
        claims: values.claims,
        schema: values.schema,
      }

      return handleSubmit(dto)
    },
  })

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
      onDisable: handleDisable,
      handleComparisonChange,
    })

    formik.values.claims = emptyClaimsFields
    setFields(schemaFields)
  }, [formik.values.schema])

  const handleComparisonChange = (idx: number, type: COMPARISON_TYPE) => {
    const updatedClaims = produce(formik.values.claims, (draft: IClaim[]) => {
      if (idx !== -1) {
        draft[idx] = {
          ...draft[idx],
          comparison: type,
        }
      }
    })

    formik.values.claims = updatedClaims
    formik.setFieldValue('claims', updatedClaims)
  }

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

  // !FIXME
  const handleDisable = (idx: number, value: boolean) => {
    const uniqueDisabled = new Set(disabledClaims)

    if (value) {
      uniqueDisabled.add(idx)
    } else {
      uniqueDisabled.delete(idx)
    }

    setDisabledClaims([...uniqueDisabled])
  }

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
          <FormControl>
            <FormLabel htmlFor="verifier">Verifier</FormLabel>
            <Input
              onChange={formik.handleChange}
              disabled
              id="verifier"
              type="text"
              value={formik.values.verifier}
              name="verifier"
            />
          </FormControl>
        )}

        {claimFields && (
          <Box w="100%">
            <TableWidget head={['title', 'value', 'comparison', 'enabled']} body={claimFields} />
          </Box>
        )}

        <FormActions
          handleReset={formik.resetForm}
          isSubmitting={isSubmitting}
          submitLabel={'Create new verification policy'}
        />
      </FormBody>
    </form>
  )
}
