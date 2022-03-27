import {
  Checkbox,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react'
import { CLAIM_TYPES, IClaim, IClaimValueTypes, ISchema } from '@ssi-ms/interfaces'
import React from 'react'

const NO_NEGATIVES: number = 0

interface ICreateSchemaFieldsFromSchemaArgs {
  schema: ISchema
  handleClaimValueChange: (idx: number, value: IClaimValueTypes) => void
  onDisable?: (idx: number, value: boolean) => void
}

export const useSchemaFields = () => {
  const createSchemaFieldsFromSchema = ({
    schema,
    handleClaimValueChange,
    onDisable,
  }: ICreateSchemaFieldsFromSchemaArgs) => {
    let emptyClaimsFields: IClaim[] = []
    const schemaFields: (React.ReactNode | string)[][] = schema.fields.data.reduce((acc, field, idx: number) => {
      let component: React.ReactNode
      let defaultValue: IClaimValueTypes
      switch (field.type) {
        case CLAIM_TYPES.CHECKBOX:
          defaultValue = false
          component = <Checkbox size={'lg'} onChange={(e) => handleClaimValueChange(idx, e.target.checked)} />
          break
        case CLAIM_TYPES.NUMERIC:
          defaultValue = 0
          component = (
            <NumberInput
              onChange={(value: string) => handleClaimValueChange(idx, parseInt(value, 10))}
              min={NO_NEGATIVES}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )
          break
        default:
          break
      }

      if (!component) {
        console.error(`Could not render component for ${field.title}`)
        return acc
      }

      const newClaim: IClaim = { title: field.title, type: field.type, value: defaultValue }
      emptyClaimsFields = [...emptyClaimsFields, newClaim]

      let schemaField = [field.title, component]

      if (!!onDisable) {
        const disableSwitch = <Switch onChange={(e) => onDisable(idx, e.target.checked)} />
        schemaField = [...schemaField, disableSwitch]
      }

      return [...acc, schemaField]
    }, [])

    return { schemaFields, emptyClaimsFields }
  }

  return { createSchemaFieldsFromSchema }
}
