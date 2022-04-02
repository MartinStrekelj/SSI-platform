import {
  ICreatePresentationResponse,
  IGenericResponse,
  IPresentationClaim,
  ISendVerifiableDataForSDR,
  isPresentation,
  IVerifiableData,
} from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'
import { create } from 'apisauce'
import { getMyDid } from '../lib/DIDService'
import { createPresentation, createPresentationWithMultipleCredentials } from '../Veramo/createPresentation'
import unpackDIDMessage from '../Veramo/unpackDIDMessage'

const CredentailsApi = create({
  baseURL: 'http://localhost:3333/api/credentials',
})

export const createPresentationRequest = async (claims: IPresentationClaim[]) => {
  try {
    const headers = await prepareRequestHeaders()
    const response = await CredentailsApi.post('/presentation', { claims }, headers)
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

export const verifyDataRequest = async (payload: ISendVerifiableDataForSDR) => {
  try {
    const headers = await prepareRequestHeaders()
    const presentation = await createPresentationFromVerifiableData(payload.data)

    const data: ISendVerifiableDataForSDR = { ...payload, presentation }
    const response = await CredentailsApi.post('/verify/data', data, headers)

    const { message: responseMessage } = response.data as IGenericResponse

    if (response.status >= 400) {
      throw new Error(responseMessage)
    }

    return { ok: true, message: responseMessage }
  } catch (err) {
    return { ok: false, message: err.message }
  }
}

const prepareRequestHeaders = async () => {
  const identity = await getMyDid()
  return {
    headers: {
      Authorization: `Bearer ${identity.did}`,
    },
  }
}

const createPresentationFromVerifiableData = async (data: IVerifiableData[]) => {
  const credentials = data.map((datum) => {
    if (isPresentation(datum)) {
      return datum.verifiablePresentation.verifiableCredential[0]
    }

    return datum.verifiableCredential
  })

  const presentation = await createPresentationWithMultipleCredentials(credentials)
  return presentation
}
