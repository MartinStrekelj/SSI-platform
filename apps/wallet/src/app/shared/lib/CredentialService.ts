import { MESSAGE_TYPE, LOGIN_2FA_BODY, TRANSFER_BODY, ISingleDisclosureDTO } from '@ssi-ms/interfaces'
import { LZW_decode } from '@ssi-ms/utils'
import { VerifiableCredential } from '@veramo/core'
import unpackDIDMessage from '../Veramo/unpackDIDMessage'

export interface IScanMessagePayload {
  type: MESSAGE_TYPE
  payload: string | VerifiableCredential | ISingleDisclosureDTO
}

type IHandleScanMessage = (msg: string) => Promise<IScanMessagePayload>

// Every QR message received is first LZW encoded -> then IDID message encoded & protected
export const handleScanMessage: IHandleScanMessage = async (encodedMessage: string) => {
  const lzw_decoded = LZW_decode(encodedMessage)
  try {
    const message = await unpackDIDMessage(lzw_decoded)
    switch (message.message.id) {
      case MESSAGE_TYPE.LOGIN_2FA:
        const { PIN } = message.message.body as LOGIN_2FA_BODY
        return { type: MESSAGE_TYPE.LOGIN_2FA, payload: PIN }

      case MESSAGE_TYPE.TRANSFER:
        const { credential } = message.message.body as TRANSFER_BODY
        return { type: MESSAGE_TYPE.TRANSFER, payload: credential }

      default:
        throw new Error('This message type is not supported!')
    }
  } catch (e) {
    const parsedMessage = JSON.parse(lzw_decoded) as ISingleDisclosureDTO

    if (parsedMessage.sdr === undefined) {
      throw new Error('Unknown message')
    }

    return { type: MESSAGE_TYPE.SDR, payload: parsedMessage }
  }
}
