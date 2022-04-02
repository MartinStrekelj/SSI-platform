import { VerifiablePresentation } from '@veramo/core'
import { IClaim } from './CredentialGenerationDTOs'
import { IVerifiableData } from './CredentialManagementDTOs'

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

export const SDR_COMPLETED = [SDR_STATUS.APPROVED, SDR_STATUS.REJECTED]

export interface ISingleDisclosureDTO {
  id: string
  metadata: {
    verifier: string
    verifierDID: string
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

export interface ISendVerifiableDataForSDR {
  sdrKey: string
  data?: IVerifiableData[]
  presentation?: VerifiablePresentation
}

export const isAddVerificationPolicyRequest = (tbd: any): tbd is IVerificationPolicyDTO =>
  tbd.issuer !== undefined && tbd.claims !== undefined && tbd?.claims?.length && tbd.schema !== undefined

export const isUseVerificationPolicyRequest = (tbd: any): tbd is IUseVerificationPolicyRequest =>
  tbd.sdrKey !== undefined

export const isSendVerifiableDataForSDRequest = (tbd: any): tbd is ISendVerifiableDataForSDR =>
  tbd.sdrKey !== undefined && tbd.data !== undefined && tbd.data.length >= 1
