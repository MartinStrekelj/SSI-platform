export enum CLAIM_TYPES {
  EQUALS = 'equals',
  MORE_THAN = 'more_than',
  LESS_THAN = 'less_than',
}

export interface IVerifiableCredentialDTO {
  issuer: string
  subject: string
  expiryDate?: Date
  type: string
  claims: IClaim[]
}

export interface IClaim {
  id?: number
  type: CLAIM_TYPES
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
