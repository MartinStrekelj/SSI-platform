import { VerifiableCredential } from '@veramo/core'
import { agent } from './setup'

const storeCredential = async (credential: VerifiableCredential) =>
  await agent.dataStoreSaveVerifiableCredential({ verifiableCredential: credential })

export default storeCredential
