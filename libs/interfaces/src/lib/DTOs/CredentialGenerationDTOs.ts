export enum CLAIM_TYPES {
  NUMERIC = 'numeric',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}

export interface IVerifiableCredentialDTO {
  id?: string
  issuer: string
  subject: string
  expiryDate?: string
  issuanceDate?: string
  schema?: string
  type: string
  claims: IClaim[]
}

export interface IClaim {
  id?: number
  type?: CLAIM_TYPES
  title: string
  value: IClaimValueTypes
}

export type IClaimValueTypes = string | number | boolean

export type IPresentationClaim = IClaim & { vc: string }

/**
 * GUARDS
 */
export const isCreateVerifiableCredentialRequest = (tbd: any): tbd is IVerifiableCredentialDTO =>
  tbd.did !== undefined ||
  tbd.issuer !== undefined ||
  tbd.type !== undefined ||
  (tbd.claims !== undefined && tbd.claims.length >= 1)
