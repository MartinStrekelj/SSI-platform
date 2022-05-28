export enum CLAIM_TYPES {
  NUMERIC = 'numeric',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
}

export enum COMPARISON_TYPE {
  EQUALS = 'equals',
  LESS_THAN = 'less_than',
  MORE_THAN = 'more_than',
  MORE_OR_EQUALS = 'more_or_equals',
  LESS_OR_EQUALS = 'less_or_equals',
}

export interface IVerifiableCredentialDTO {
  id?: string
  issuer: string
  subject: string
  expiryDate?: string
  issuanceDate?: string
  schema?: string
  isRevoked?: boolean
  type: string
  claims: IClaim[]
}

export interface IClaim {
  id?: number
  type?: CLAIM_TYPES
  comparison?: COMPARISON_TYPE
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
