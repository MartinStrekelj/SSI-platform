import { IClaim } from '@ssi-ms/interfaces'
import { VerifiableCredential, VerifiablePresentation } from '@veramo/core'

export const getAllPresentationClaims = (presentation: VerifiablePresentation) => {
  const reducer = (agg: IClaim[], current: VerifiableCredential) => {
    const currentClaims: IClaim[] = JSON.parse(current.credentialSubject.claims)
    return [...agg, ...currentClaims]
  }

  return presentation.verifiableCredential.reduce(reducer, [])
}
