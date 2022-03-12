import { ICreatePresentationResponse, IPresentationClaim } from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'
import { create } from 'apisauce'
import { getMyDid } from '../lib/DIDService'
import { createPresentation } from '../Veramo/createPresentation'
import unpackDIDMessage from '../Veramo/unpackDIDMessage'

const CredentailsApi = create({
  baseURL: 'http://localhost:3333/api/credentials',
})

export const createPresentationRequest = async (claims: IPresentationClaim[]) => {
  const identity = await getMyDid()
  try {
    const response = await CredentailsApi.post(
      '/presentation',
      { claims },
      {
        headers: {
          Authorization: `Bearer ${identity.did}`,
        },
      }
    )

    if (response.status >= 400) {
      throw new Error('Something went wrong with the request')
    }

    const { message } = response.data as ICreatePresentationResponse
    const unpackedMessage = await unpackDIDMessage(message)
    const proxyVC = unpackedMessage.message.body as VerifiableCredential
    await createPresentation(proxyVC)
    return { ok: true, message: 'New Verifiable presentation created!' }
  } catch (e) {
    console.error(e)
    return { ok: false, message: e.message as string }
  }
}
