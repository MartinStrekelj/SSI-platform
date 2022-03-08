import { IPresentationClaim } from '@ssi-ms/interfaces'
import findCredential from '../Veramo/findCredential'

export const checkPresentationClaimsValidity = async (claims: IPresentationClaim[]) => {
  if (!claims.length) {
    return false
  }

  for (let i = 0; i < claims.length; i++) {
    const claim: IPresentationClaim = claims[i]
    const vc = await findCredential(claim.vc)
    if (!vc) {
      return false
    }
  }

  return true
}
