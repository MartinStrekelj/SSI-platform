import { IVerifiableData } from '@ssi-ms/interfaces'
import { UniqueVerifiableCredential } from '@veramo/data-store'

export enum Screens {
  WALLET = 'Wallet',
  SCANNER = 'Scanner',
  CREDENTIALS = 'Credentials',
  PRESENTATION = 'Presentation',
  MODAL = 'Modal',
  CREDENTIAL_DETAILS = 'Credential details',
}

export type RootStackParamList = {
  [Screens.WALLET]: undefined
  [Screens.SCANNER]: undefined
  [Screens.CREDENTIALS]: undefined
  [Screens.PRESENTATION]: { data: UniqueVerifiableCredential[] }
  [Screens.MODAL]: { message: string }
  [Screens.CREDENTIAL_DETAILS]: { data: IVerifiableData }
}
