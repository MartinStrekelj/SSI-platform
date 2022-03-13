import { CLAIM_TYPES } from './CredentialGenerationDTOs'

export interface ISchema {
  id?: string
  title: string
  display?: boolean
  fields: {
    data: ISchemaField[]
  }
}

export interface ISchemaField {
  title: string
  type: CLAIM_TYPES
  options?: string[] | number[]
}

export const isAddSchemaRequest = (tbd: any): tbd is ISchema =>
  tbd.title !== undefined && tbd.fields !== undefined && tbd.fields.data.length >= 1
