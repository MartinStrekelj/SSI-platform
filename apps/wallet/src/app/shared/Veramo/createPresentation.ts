import { VerifiableCredential } from '@veramo/core'
import { getMyDid } from '../lib/DIDService'
import { agent } from './setup'

// Continue tommorow

export const createPresentation = async (vc: VerifiableCredential) => {
  const identity = await getMyDid()
  await agent.createVerifiablePresentation({
    presentation: {
      holder: identity.did,
      verifiableCredential: [vc],
    },
    proofFormat: 'jwt',
    save: true,
  })
}
