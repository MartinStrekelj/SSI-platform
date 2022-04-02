import { VerifiableCredential } from '@veramo/core'
import { getMyDid } from '../lib/DIDService'
import { agent } from './setup'

export const createPresentation = async (VC: VerifiableCredential) => {
  const identity = await getMyDid()
  await agent.createVerifiablePresentation({
    presentation: {
      holder: identity.did,
      verifiableCredential: [VC],
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
