import { MESSAGE_TYPE, LOGIN_2FA_BODY, TRANSFER_BODY } from '@ssi-ms/interfaces'
import { LZW_decode } from '@ssi-ms/utils'
import storeCredential from '../Veramo/storeCredential'
import unpackDIDMessage from '../Veramo/unpackDIDMessage'

// Every QR message received is first LZW encoded -> then IDID message encoded & protected
export const handleScanMessage = async (encodedMessage: string) => {
  const lzw_decoded = LZW_decode(encodedMessage)
  const message = await unpackDIDMessage(lzw_decoded)

  switch (message.message.id) {
    case MESSAGE_TYPE.LOGIN_2FA:
      const { PIN } = message.message.body as LOGIN_2FA_BODY
      console.warn(PIN)
      return { PIN }

    case MESSAGE_TYPE.TRANSFER:
      const { credential } = message.message.body as TRANSFER_BODY
      await storeCredential(credential)
      return credential

    default:
      throw new Error('This message type is not supported!')
  }
}
