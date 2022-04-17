import { IGenericResponse, IVerifiableCredentialRevocationDTO } from '@ssi-ms/interfaces'
import { create } from 'apisauce'

const RevokeApi = create({
  baseURL: '/api/revoke',
})

export const revokeCredentialRequest = async (dto: IVerifiableCredentialRevocationDTO) => {
  try {
    const response = await RevokeApi.post('/', dto)
    const { message } = response.data as IGenericResponse
    if (response.status >= 400) {
      throw new Error(message)
    }
    return { ok: true, message }
  } catch (error) {
    return { ok: false, message: error.message }
  }
}
