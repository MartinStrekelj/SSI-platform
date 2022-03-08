import { IPresentationClaim } from '@ssi-ms/interfaces'
import { create } from 'apisauce'

const did = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'

const CredentailsApi = create({
  baseURL: 'http://localhost:3333/api/credentials',
})

export const createPresentationRequest = async (claims: IPresentationClaim[]) => {
  const response = await CredentailsApi.post(
    '/presentation',
    { claims },
    {
      headers: {
        Authorization: `Bearer ${did}`,
      },
    }
  )
  console.log({ response: response.data })
}
