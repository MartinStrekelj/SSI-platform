import {
  Checkbox,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Switch,
} from '@chakra-ui/react'
import { CLAIM_TYPES, COMPARISON_TYPE, IClaim, IClaimValueTypes, ISchema } from '@ssi-ms/interfaces'
import React, { ChangeEventHandler } from 'react'

const NO_NEGATIVES: number = 0

interface ICreateSchemaFieldsFromSchemaArgs {
  schema: ISchema
  handleClaimValueChange: (idx: number, value: IClaimValueTypes) => void
  handleComparisonChange?: (idx: number, value: COMPARISON_TYPE) => void
  onDisable?: (idx: number, value: boolean) => void
}

export const useSchemaFields = () => {
  const createSchemaFieldsFromSchema = ({
    schema,
    handleClaimValueChange,
    onDisable,
    handleComparisonChange,
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
        case CLAIM_TYPES.TEXT:
          defaultValue = ''
          component = <Input onChange={(e) => handleClaimValueChange(idx, e.target.value)}></Input>
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

      if (!!handleComparisonChange) {
        // Handle comparison
        const comparisonComponent = (
          <Select name={field.title} onChange={(e) => handleComparisonChange(idx, e.target.value as COMPARISON_TYPE)}>
            {Object.values(COMPARISON_TYPE).map((comparison: string) => (
              <option key={comparison} value={comparison}>
                {comparison}
              </option>
            ))}
          </Select>
        )

        const comparison = field.type === CLAIM_TYPES.NUMERIC ? comparisonComponent : COMPARISON_TYPE.EQUALS
        schemaField = [...schemaField, comparison]
      }

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
