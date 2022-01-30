export interface IWalletConnectRequest {
  did: string;
}
export interface IWalletConnectResponse {}

export interface IWallet2FARequest {
  did: string;
  PIN: string;
}

export interface IWallet2FAResponse {
  did: string;
  PIN: string;
}

// GUARDS

export const isWalletConnectRequest = (
  tbd: any
): tbd is IWalletConnectRequest => tbd.did !== undefined;

export const isWallet2FARequest = (tbd: any): tbd is IWallet2FARequest =>
  tbd.did !== undefined && tbd.PIN !== undefined;
