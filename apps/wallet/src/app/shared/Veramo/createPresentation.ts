import { VerifiableCredential } from '@veramo/core'
import { getMyDid } from '../lib/DIDService'
import { agent } from './setup'

const VP_TYPE = 'VerifiablePresentation'

export const createPresentation = async (VCs: VerifiableCredential[], presentationName = 'Custom presentation') => {
  const identity = await getMyDid()
  await agent.createVerifiablePresentation({
    presentation: {
      type: [VP_TYPE, presentationName],
      holder: identity.did,
      verifiableCredential: VCs,
    },
    proofFormat: 'jwt',
    save: true,
  })
}

export const createPresentationWithMultipleCredentials = async (VCs: VerifiableCredential[], save = false) => {
  const identity = await getMyDid()
  return await agent.createVerifiablePresentation({
    presentation: {
      holder: identity.did,
      verifiableCredential: VCs,
    },
    proofFormat: 'jwt',
    save: save,
  })
}
