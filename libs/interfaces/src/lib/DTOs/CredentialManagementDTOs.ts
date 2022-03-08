import { IPresentationClaim, IVerifiableCredentialDTO } from './CredentialGenerationDTOs'

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

/**
 * GUARDS
 */
export const isTransferCredentialRequest = (tbd: any): tbd is ITransferCredentialRequest => tbd.hash !== undefined

export const isCreatePresentationRequest = (tbd: any): tbd is ICreatePresentationRequest => tbd.claims !== undefined
