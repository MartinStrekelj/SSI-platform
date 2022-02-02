import { ROLES } from '../roles'

export interface IdentityResponse {
  identity: IIdentity
}

export interface IIdentityMetadata {
  role?: ROLES[]
  alias?: string
}
export interface IIdentity {
  did: string
  metadata?: IIdentityMetadata
}
