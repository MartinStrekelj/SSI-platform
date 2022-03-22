import { IClaim } from './CredentialGenerationDTOs'

export interface IVerificationPolicyDTO {
  id?: string
  issuer: string
  schema: string
  claims: IClaim[]
}

// Supabase data model
export interface IVerificationPolicy {
  id: string
  issuer: string
  schema: string
  fields: { data: IClaim[] }
  created_at?: Date
  updated_at?: Date
}

export const isAddVerificationPolicyRequest = (tbd: any): tbd is IVerificationPolicyDTO =>
  tbd.issuer !== undefined && tbd.fields !== undefined && tbd.fields.data.length >= 1 && tbd.schema !== undefined