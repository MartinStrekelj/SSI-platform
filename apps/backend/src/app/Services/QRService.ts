import { LZW_encode } from '@ssi-ms/utils'
import { da } from 'date-fns/locale'
import * as qrcode from 'qrcode'

export const generateQRfromString = async (
  value: string,
  options: qrcode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'L',
    margin: 8,
    rendererOpts: { quality: 1 },
  }
) => {
  const compressedMessage = LZW_encode(value)
  try {
    const url = await qrcode.toDataURL(compressedMessage, options)
    return url
  } catch (e) {
    console.error(e)
  }
}
