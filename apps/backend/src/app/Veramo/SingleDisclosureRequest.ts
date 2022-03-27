import { IClaim } from '@ssi-ms/interfaces'
import { ICredentialRequestInput, ISelectiveDisclosureRequest } from '@veramo/selective-disclosure'
import { agent } from './setup'

interface ICreateSDRArgs {
  issuer: string
  claims: IClaim[]
  reason?: string
}

const DEFAULT_REASON = 'Please provide the following'

export const createSDR = async (args: ICreateSDRArgs) => {
  const data: ISelectiveDisclosureRequest = {
    issuer: args.issuer,
    claims: convertClaimsToSDRInput(args.claims, args.reason),
    tag: args.reason || DEFAULT_REASON,
  }
  const sdr = await agent.createSelectiveDisclosureRequest({ data })
  return sdr
}

const convertClaimsToSDRInput = (claims: IClaim[], reason = DEFAULT_REASON) => {
  const sdrInputs: ICredentialRequestInput[] = claims.map((claim) => {
    const input: ICredentialRequestInput = {
      essential: true,
      claimType: claim.title,
      claimValue: JSON.stringify(claim.value),
      reason,
    }

    return input
  })

  return sdrInputs
}
