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
