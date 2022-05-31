import { CLAIM_TYPES, COMPARISON_TYPE, IClaim } from '@ssi-ms/interfaces'
import { VerifiablePresentation } from '@veramo/core'
import { ICredentialRequestInput, ISelectiveDisclosureRequest } from '@veramo/selective-disclosure'
import { agent } from './setup'

const STRICT_COMPARISON_TYPES = [CLAIM_TYPES.CHECKBOX, CLAIM_TYPES.SELECT]

interface ICreateSDRArgs {
  issuer: string
  claims: IClaim[]
  reason?: string
}

const DEFAULT_REASON = 'Please provide the following'

export const createSDR = async (args: ICreateSDRArgs) => {
  const data: ISelectiveDisclosureRequest = {
    issuer: args.issuer,
    claims: convertClaimsToSDRInput(args.claims),
    tag: args.reason || DEFAULT_REASON,
  }
  const sdr = await agent.createSelectiveDisclosureRequest({ data })
  return sdr
}

export const validateSDR = async (presentation: VerifiablePresentation, sdr: ISelectiveDisclosureRequest) => {
  return await agent.validatePresentationAgainstSdr({ presentation, sdr })
}

const convertClaimsToSDRInput = (claims: IClaim[]) => {
  const sdrInputs: ICredentialRequestInput[] = claims.map((claim) => {
    let input: ICredentialRequestInput = {
      essential: false,
      claimType: claim.title,
      claimValue: JSON.stringify(claim.value),
      reason: claim.comparison, // used as comparison type payload
    }

    // Only require the value for strict comparison types
    if (STRICT_COMPARISON_TYPES.includes(claim.type) || claim.comparison === COMPARISON_TYPE.EQUALS) {
      input = { ...input, essential: true }
    }

    return input
  })

  return sdrInputs
}
