import { IGenericResponse, IListCredentialsDTO, IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
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
    console.log('Fetching credentials')
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
  const { data, error, isValidating } = useSWR('/', credentialsFetcher)

  return {
    data: data,
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}
