export enum CLAIM_TYPES {
  NUMERIC = 'numeric',
  BINARY = 'binary',
}

export interface IVerifiableCredentialDTO {
  id?: string
  issuer: string
  subject: string
  expiryDate?: string
  issuanceDate?: string
  type: string
  claims: IClaim[]
}

export interface IClaim {
  id?: number
  type?: CLAIM_TYPES
  title: string
  value: string | number
}

/**
 * GUARDS
 */
export const isCreateVerifiableCredentialRequest = (tbd: any): tbd is IVerifiableCredentialDTO =>
  tbd.did !== undefined ||
  tbd.issuer !== undefined ||
  tbd.type !== undefined ||
  (tbd.claims !== undefined && tbd.claims.length >= 1)
