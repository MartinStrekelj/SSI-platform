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

export interface IVerificationPoliciesResponse {
  message: string
  policies: IVerificationPolicy[]
}

export interface IVerificationPolicyResponse {
  message: string
  policy: IVerificationPolicy | null
}

export const isAddVerificationPolicyRequest = (tbd: any): tbd is IVerificationPolicyDTO =>
  tbd.issuer !== undefined && tbd.claims !== undefined && tbd?.claims?.length && tbd.schema !== undefined
