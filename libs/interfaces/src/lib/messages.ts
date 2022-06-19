import { VerifiableCredential } from '@veramo/core'

export enum MESSAGE_TYPE {
  LOGIN_2FA = 'login-2fa',
  TRANSFER = 'credential-transfer',
  PRESENTATION = 'presentation',
  SDR = 'sdr',
}

export interface LOGIN_2FA_BODY {
  PIN: string
}

export interface TRANSFER_BODY {
  credential: string // credential indicator
}
