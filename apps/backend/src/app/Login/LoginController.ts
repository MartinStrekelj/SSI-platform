import * as qrcode from 'qrcode';
import * as cache from 'memory-cache';
import { Response, Request } from 'express';
import { generatePIN, LZW_encode } from '@ssi-ms/utils';
import { createDIDMessage } from '../Veramo/createMessage';

const FIVE_MINUTES = 5 * 60 * 1000; // min * s * ms

// ? move this to shared library
interface IWalletConnectRequest {
  did: string;
}

interface IWallet2FARequest {
  did: string;
  PIN: string;
}

const isWalletConnectRequest = (tbd: any): tbd is IWalletConnectRequest =>
  tbd.did !== undefined;

const isWallet2FARequest = (tbd: any): tbd is IWallet2FARequest =>
  tbd.did !== undefined && tbd.PIN !== undefined;

export const LoginWithWallet = async (req: Request, res: Response) => {
  const { body } = req;

  if (!isWalletConnectRequest(body)) {
    return res.status(400).send({ message: 'Error!' });
  }
  try {
    //* generate unique PIN
    const PIN = generatePIN();

    //* save PIN to cache
    cache.put(body.did, PIN, FIVE_MINUTES);

    //* encode PIN to (IDID-COMM)
    const IDIDCommMessage = await createDIDMessage(
      {
        to: body.did,
        body: { PIN },
        id: 'login-2fa',
        type: 'DIDCommV2Message-sent',
      },
      'anoncrypt'
    );

    console.log(IDIDCommMessage.message);

    //* compress message to make QR code size as small as posible
    const compressedMessage = LZW_encode(IDIDCommMessage.message);

    // * encode token to QR
    const qrcode = await generateQRfromString(compressedMessage);
    return res.send({ qrcode });
  } catch (e: unknown) {
    console.error(e);
    return res.status(400).send({ error: 'something went wrong!' });
  }
};

//* 2FA connection
export const Wallet2FAuth = async (req: Request, res: Response) => {
  const { body } = req;

  if (!isWallet2FARequest(body)) {
    return res.status(400).send({ message: 'Error!' });
  }

  const cacheHit = cache.get(body.did);

  if (cacheHit === null) {
    return res.status(400).send({ message: 'No cache hit!' });
  }

  console.debug(cacheHit);

  if (cacheHit !== body.PIN) {
    return res.status(400).send({ message: 'Not correct PIN' });
  }

  return res.send({ message: 'success' });
};

// ? maybe move this inside util lib -> if need for more qr code gens
const generateQRfromString = async (
  value: string,
  options: qrcode.QRCodeToDataURLOptions = {}
) => {
  try {
    const url = await qrcode.toDataURL(value, options);
    return url;
  } catch (e) {
    console.error(e);
  }
};
