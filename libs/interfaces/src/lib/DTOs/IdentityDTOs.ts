export interface IdentityResponse {
  identity: IIdentity;
}

export interface IIdentity {
  did: string;
  metadata?: Object;
}
