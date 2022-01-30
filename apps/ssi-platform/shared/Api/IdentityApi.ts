import { IdentityResponse } from '@ssi-ms/interfaces';
import { create } from 'apisauce';

const IdentityApi = create({
  baseURL: '/api/identity',
});

export const fetchIdentity = async () => {
  try {
    const response = await IdentityApi.get('/');
    if (response.status >= 400) {
      throw Error('Not authenticated!');
    }

    const { identity } = response.data as IdentityResponse;
    return { ok: true, identity };
  } catch (e) {
    return { ok: false, message: e.message };
  }
};
