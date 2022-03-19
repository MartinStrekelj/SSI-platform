import {
  IFindCredentialByIdResponse,
  IGenericResponse,
  IListCredentialsDTO,
  ITransferCredentialRequest,
  ITransferCredentialResponse,
  IVerifiableCredentialDTO,
} from '@ssi-ms/interfaces'
import { create } from 'apisauce'
import useSWR from 'swr'

const CredentialsApi = create({
  baseURL: '/api/credentials',
})

const credentialsFetcher = (url: string) => CredentialsApi.get(url).then((res) => res.data)

export const issueNewVerifiableCredential = async (data: IVerifiableCredentialDTO) => {
  try {
    const response = await CredentialsApi.post('/issue', data)

    if (response.status >= 400) {
      throw new Error('Something went wrong')
    }

    const { message } = response.data as IGenericResponse

    return { ok: true, message }
  } catch (error) {
    console.error(error.message)
    return { ok: false, message: error.message }
  }
}

export const fetchMyCredentials = async () => {
  try {
    const response = await CredentialsApi.get('/', {})
    console.log(response)
    if (response.status >= 400) {
      throw new Error('Something went wrong')
    }

    const { credentials } = response.data as IListCredentialsDTO
    return { ok: true, credentials }
  } catch (error) {
    console.error(error.message)
    return { ok: false, credentials: [] }
  }
}

export const useCredentials = () => {
  const { data, error, isValidating } = useSWR('/?credentials', credentialsFetcher)

  return {
    data: data as IListCredentialsDTO,
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}

export const useCredential = (id: string) => {
  const { data, error, isValidating } = useSWR(`/${id}?credentials`, credentialsFetcher)

  return {
    data: data as IFindCredentialByIdResponse,
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}

export const getCredentialTransferCode = async (hash: string) => {
  try {
    const data: ITransferCredentialRequest = { hash }
    const response = await CredentialsApi.post('/transfer', data)
    if (response.status >= 400) {
      throw new Error('Something went wrong!')
    }

    const { qrcode } = response.data as ITransferCredentialResponse
    return { ok: true, message: qrcode }
  } catch (e: any) {
    console.error(e.message)
    return { ok: false, message: e.message as string }
  }
}
