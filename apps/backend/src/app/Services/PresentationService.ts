import { IClaim, IPresentationClaim, IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'
import findCredential from '../Veramo/findCredential'
import { createVerifiableCredential } from '../Veramo/IssueCredentials'

/**
 * Idea is to receive array of IPresentationClaims
 * Group them by verifiable credential
 * Check the integrity of all claims and credentials
 * Return accepted array of (subset) verifiable credentials
 */
export const prepareCredentialsFromClaims = async (claims: IPresentationClaim[]) => {
  let result: VerifiableCredential[] = []
  const credentials = getUniqueCredentialList(claims)
  for (let i = 0; i < credentials.length; i++) {
    const credential = credentials[i]
    const credentialClaims = claims.filter((c) => c.vc === credential)
    const newCredential = await matchClaimsWithCredential(credential, credentialClaims)
    if (!newCredential) {
      throw new Error('Invalid credential DTO')
    }

    result = [...result, newCredential]
  }

  return result
}

const getUniqueCredentialList = (claims: IPresentationClaim[]) => {
  const uniqueSet = new Set(claims.map((c) => c.vc))
  return [...uniqueSet]
}

const matchClaimsWithCredential = async (credential: string, claims: IPresentationClaim[]) => {
  const VerifiableCredential = await findCredential(credential)
  const credentialClaims: IClaim[] = JSON.parse(VerifiableCredential.credentialSubject.claims)
  const newClaims: IClaim[] = claims.map((c) => {
    return {
      title: c.title,
      value: c.value,
      type: c.type,
    }
  })

  const areClaimsValid = newClaims.every((submitedClaim) => {
    return !!credentialClaims.find(
      (credentailClaim) =>
        credentailClaim.title === submitedClaim.title && credentailClaim.value === submitedClaim.value
    )
  })

  if (!areClaimsValid) {
    return false
  }

  const dto: IVerifiableCredentialDTO = {
    issuer: VerifiableCredential.issuer.id,
    subject: VerifiableCredential.credentialSubject.id,
    claims: newClaims,
    type: `Presentation of ${VerifiableCredential.type[1]}`,
    expiryDate: VerifiableCredential.expirationDate,
  }

  return await createVerifiableCredential(dto, false)
}
