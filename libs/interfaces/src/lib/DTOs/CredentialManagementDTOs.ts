import { IPresentationClaim, IVerifiableCredentialDTO } from './CredentialGenerationDTOs'
import { UniqueVerifiableCredential, UniqueVerifiablePresentation } from '@veramo/data-store'

export interface IListCredentialsDTO {
  credentials: IVerifiableCredentialDTO[]
}

export interface IFindCredentialByIdResponse {
  credential: IVerifiableCredentialDTO
}

export interface ITransferCredentialRequest {
  hash: string
}

export interface ITransferCredentialResponse {
  qrcode: string
}

export interface ICreatePresentationRequest {
  claims: IPresentationClaim[]
}

export interface ICreatePresentationResponse {
  message: string
}

export type IVerifiableData = UniqueVerifiableCredential | UniqueVerifiablePresentation

export interface IVerifiableCredentialRevocationDTO {
  credential: string
  issuer: string
  reason?: string
}

export type IVerifiableCredentialRevocation = IVerifiableCredentialRevocationDTO & {
  id: number
  created_at: string
}

/**
 * GUARDS
 */
export const isTransferCredentialRequest = (tbd: any): tbd is ITransferCredentialRequest => tbd.hash !== undefined

export const isCreatePresentationRequest = (tbd: any): tbd is ICreatePresentationRequest => tbd.claims !== undefined

export const isPresentation = (result: any): result is UniqueVerifiablePresentation =>
  result.verifiablePresentation !== undefined
