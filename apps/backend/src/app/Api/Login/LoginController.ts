import * as cache from 'memory-cache'
import { Response, Request } from 'express'
import { generatePIN } from '@ssi-ms/utils'
import createDIDMessage from '../../Veramo/createDIDMessage'
import { generateQRfromString } from '../../Services/QRService'
import { isWalletConnectRequest, isWallet2FARequest, IWalletConnectResponse, MESSAGE_TYPE } from '@ssi-ms/interfaces'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'
import { setAccessCookie } from '../../Services/CookieService'

const FIVE_MINUTES = 5 * 60 * 1000 // min * s * ms

export const LoginWithWallet = async (req: Request, res: Response) => {
  const { body } = req

  if (!isWalletConnectRequest(body)) {
    return res.status(400).send({ message: 'Error!' })
  }

  const authority = await checkIfAuthorityDid(body.did)

  if (authority) {
    setAccessCookie(body.did, res)
    const response: IWalletConnectResponse = {
      qrcode: 'no qr code needed',
      accessGranted: true,
    }
    return res.send(response)
  }

  // Holder -> not part of the backend stored DIDs
  try {
    //* generate unique PIN
    const PIN = generatePIN()

    //* save PIN to cache
    cache.put(body.did, PIN, FIVE_MINUTES)

    //* encode PIN to (IDID-COMM)
    const IDIDCommMessage = await createDIDMessage(
      {
        to: body.did,
        body: { PIN },
        id: MESSAGE_TYPE.LOGIN_2FA,
        type: 'DIDCommV2Message-sent',
      },
      'anoncrypt'
    )

    // * encode token to QR
    const qrcode = await generateQRfromString(IDIDCommMessage.message)
    const response: IWalletConnectResponse = { qrcode: qrcode }
    return res.send(response)
  } catch (e: unknown) {
    console.error(e)
    return res.status(400).send({ error: 'something went wrong!' })
  }
}

//* 2FA connection
export const Wallet2FAuth = async (req: Request, res: Response) => {
  const { body } = req

  if (!isWallet2FARequest(body)) {
    return res.status(400).send({ message: 'Error!' })
  }

  const cacheHit = cache.get(body.did)

  if (cacheHit === null) {
    return res.status(400).send({ message: 'No cache hit!' })
  }

  if (cacheHit !== body.PIN) {
    return res.status(400).send({ message: 'Not correct PIN' })
  }
  const accessToken = setAccessCookie(body.did, res)
  return res.send({ accessToken })
}
