import { LZW_encode } from '@ssi-ms/utils'
import * as qrcode from 'qrcode'

export const generateQRfromString = async (
  value: string,
  options: qrcode.QRCodeToDataURLOptions = { errorCorrectionLevel: 'L' }
) => {
  const compressedMessage = LZW_encode(value)
  try {
    const url = await qrcode.toDataURL(compressedMessage, options)
    return url
  } catch (e) {
    console.error(e)
  }
}
