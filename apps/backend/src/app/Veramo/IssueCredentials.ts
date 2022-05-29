import { IPresentationClaim, IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { getAuthority, checkIfAuthorityDid } from './AuthorityDIDs'
import { agent } from './setup'
import { VerifiableCredential } from '@veramo/core'
import { ICreateVerifiableCredentialArgs } from '@veramo/credential-w3c'
import { checkPresentationClaimsValidity } from '../Services/DataIntegrityService'

const VC_TYPE = 'VerifiableCredential'

type CreateVC = (
  credentialPayload: IVerifiableCredentialDTO,
  saveCredential?: boolean
) => Promise<VerifiableCredential | false>

export const createVerifiableCredential: CreateVC = async (
  credentialPayload: IVerifiableCredentialDTO,
  saveCredential = true
) => {
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
    save: saveCredential,
  }
  try {
    return await agent.createVerifiableCredential(data)
  } catch (e) {
    console.error(e)
    return false
  }
}

const resolveBothAgents = async ({ issuer: issuerDid, subject: subjectDID }: { issuer: string; subject: string }) => {
  try {
    const issuer = await agent.resolveDid({ didUrl: issuerDid })
    const subject = await agent.resolveDid({ didUrl: subjectDID })

    if (issuer.didDocument === null || subject.didDocument === null) {
      throw new Error('Error when resolving identifiers')
    }

    // Check authority is the issues
    const isAuthortiy = await checkIfAuthorityDid(issuerDid)

    if (!isAuthortiy) {
      throw new Error('Only authorities can issue verifiable credentials!')
    }

    return true
  } catch (e) {
    console.debug(e)
    return false
  }
}

/**
 * Due to Veramo not supporting specific claims extraction and
 * add them to presentation, we are creating a new 'proxy' VC
 * signed by general Authority RS and embed it to the presentation
 * on the client once the response is sent
 *
 * We are not saving either credential nor presentation
 * This is saved on the holder wallet client
 *
 * Important to do all of the data integrity checks
 * before using this function
 *
 * @deprecated -> use PresentationService
 */
export const createVCforPresentation = async (claims: IPresentationClaim[], subjectDID: string) => {
  const allClaimsAreValid = await checkPresentationClaimsValidity(claims)

  if (!allClaimsAreValid) {
    throw new Error('Credentials not valid')
  }

  const RS = await getAuthority('RS')
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      credentialSubject: { id: subjectDID, claims: JSON.stringify(claims) },
      issuer: RS.did,
    },
    proofFormat: 'jwt',
    save: false,
  })

  return verifiableCredential
}
