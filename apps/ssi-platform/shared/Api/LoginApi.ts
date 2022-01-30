import { create } from 'apisauce';

const LoginApi = create({
  baseURL: '/api/login',
  withCredentials: true,
});

export const sendDIDforLogin = async (did: string) => {
  try {
    const response = await LoginApi.post('/', { did });

    if (response.status >= 400) {
      throw Error(`Something went wrong when logging in with DID: ${did}`);
    }

    const { qrcode } = response.data as { qrcode: string };

    return { ok: true, message: qrcode };
  } catch (e) {
    console.error(e);
    return { ok: false, message: e.message };
  }
};

interface ISend2FAConfirmation {
  did: string;
  PIN: string;
}

export const send2FAConfirmation = async (data: ISend2FAConfirmation) => {
  try {
    const response = await LoginApi.post('/2fa', data);

    if (response.status >= 400) {
      throw Error(`Something went wrong when logging in with DID: ${data.did}`);
    }

    const { accessToken } = response.data as { accessToken: string };

    return { ok: true, message: accessToken };
  } catch (e) {
    console.error(e);
    return { ok: false, message: e.message };
  }
};
