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

export enum SDR_STATUS {
  PENDING = 'pending',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

export interface ISingleDisclosureDTO {
  id: string
  metadata: {
    verifier: string
    title?: string // title of the policy
  }
  sdr: string
}

export type ICachedSDRequest = ISingleDisclosureDTO & {
  status: SDR_STATUS
  expiresAt: Date
}

export interface IUseVerificationPolicyRequest {
  sdrKey: string
}

export interface IUseVerificationPolicyResponse {
  message: string
  qrcode: null | string
  id: null | string
}

export const isAddVerificationPolicyRequest = (tbd: any): tbd is IVerificationPolicyDTO =>
  tbd.issuer !== undefined && tbd.claims !== undefined && tbd?.claims?.length && tbd.schema !== undefined

export const isUseVerificationPolicyRequest = (tbd: any): tbd is IUseVerificationPolicyRequest =>
  tbd.sdrKey !== undefined
