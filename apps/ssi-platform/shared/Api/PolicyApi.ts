import { IVerificationPoliciesResponse, IVerificationPolicyDTO, IVerificationPolicyResponse } from '@ssi-ms/interfaces'
import { create } from 'apisauce'
import useSWR from 'swr'

const PolicyApi = create({
  baseURL: '/api/policy',
})

const policyFetcher = (url: string) => PolicyApi.get(url).then((res) => res.data)

export const createNewPolicyRequest = async (body: IVerificationPolicyDTO) => {
  try {
    const response = await PolicyApi.post('/', body)

    const { data } = response as { data: IVerificationPolicyResponse }

    if (response.status >= 400) {
      throw new Error(data.message)
    }

    return { ok: true, message: `New policy with id ${data.policy.id} created!` }
  } catch (err) {
    console.error(err.message)
    return { ok: false, message: err.message }
  }
}

export const usePolicies = () => {
  const { data, error, isValidating } = useSWR('/?policies', policyFetcher)
  return {
    data: data as IVerificationPoliciesResponse,
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}

export const usePolicy = (id: string) => {
  const { data, error, isValidating } = useSWR(`/${id}?policy`, policyFetcher)
  return {
    data: data as IVerificationPoliciesResponse,
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}
