import { IVerifiableCredentialDTO } from './CredentialGenerationDTOs'

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

/**
 * GUARDS
 */
export const isTransferCredentialRequest = (tbd: any): tbd is ITransferCredentialRequest => tbd.hash !== undefined
