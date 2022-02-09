import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'
import { ICreateVerifiableCredentialArgs } from '@veramo/credential-w3c'
import { checkIfAuthorityDid } from './AuthorityDIDs'
import { agent } from './setup'

const VC_TYPE = 'VerifiableCredential'

type CreateVC = (credentialPayload: IVerifiableCredentialDTO) => Promise<VerifiableCredential | false>

const createVerifiableCredential: CreateVC = async (credentialPayload: IVerifiableCredentialDTO) => {
  const agentsOk = await resolveBothAgents({
    issuer: credentialPayload.issuer,
    subject: credentialPayload.subject,
  })

  if (!agentsOk) {
    return false
  }

  const data: ICreateVerifiableCredentialArgs = {
    credential: {
      issuer: credentialPayload.issuer, // DID OF ISSUER
      credentialSubject: {
        id: credentialPayload.subject, // DID OF RECEIVER
        claims: JSON.stringify(credentialPayload.claims), // WHAT WE CLAIM THE RECEIVER ACHIEVED
      },
      expirationDate: credentialPayload.expiryDate,
      type: [VC_TYPE, credentialPayload.type], // TITLE eg. Potrdilo o opravljeni maturi
    },
    proofFormat: 'jwt',
    save: true,
  }
  try {
    return await agent.createVerifiableCredential(data)
  } catch (e) {
    console.error(e)
    return false
  }
}

const resolveBothAgents = async ({ issuer, subject }: { issuer: string; subject: string }) => {
  try {
    const i = await agent.resolveDid({ didUrl: issuer })
    const s = await agent.resolveDid({ didUrl: subject })

    if (i.didDocument === null || s.didDocument === null) {
      throw new Error('Error when resolving identifiers')
    }

    // Check authority is the issues
    const isAuthortiy = await checkIfAuthorityDid(issuer)

    if (!isAuthortiy) {
      throw new Error('Only authorities can issue verifiable credentials!')
    }

    return true
  } catch (e) {
    console.debug(e)
    return false
  }
}

export default createVerifiableCredential
