import {
  COMPARISON_TYPE,
  ICachedSDRequest,
  IClaim,
  ISingleDisclosureDTO,
  IVerificationPolicy,
  SDR_STATUS,
} from '@ssi-ms/interfaces'
import { createSDR, validateSDR } from '../Veramo/SingleDisclosureRequest'
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns'
import { saveToCache } from './CacheService'
import { checkIfAuthorityDid } from '../Veramo/AuthorityDIDs'
import { VerifiableCredential, VerifiablePresentation } from '@veramo/core'
import { ISelectiveDisclosureRequest } from '@veramo/selective-disclosure'
import { agent } from '../Veramo/setup'

export const CONFIG = {
  PENDING_EXPIRY_TIME: parseInt(process.env.SDR_PENDING_MINUTES) || 5,
  APPROVED_EXPIRY_TIME: parseInt(process.env.SDR_PENDING_MINUTES) || 30,
}

interface IHandleSDRRequestArgs {
  sdr: ICachedSDRequest
  presentation: VerifiablePresentation
}

export const createSDRfromPolicy = async (policy: IVerificationPolicy) => {
  const sdr = await createSDR({ claims: policy.fields.data, issuer: policy.issuer })
  const data = await extendWithCustomData(sdr, policy)
  saveToCache({ key: data.cacheValue.id, value: JSON.stringify(data.cacheValue), duration: CONFIG.PENDING_EXPIRY_TIME })
  return data
}

export const handleSDRRequest = async ({ sdr, presentation }: IHandleSDRRequestArgs) => {
  let sdrValidity = false

  const message = await agent.handleMessage({ raw: sdr.sdr, save: false })
  const selectiveDislosure = message.data as ISelectiveDisclosureRequest
  const preparedPresentation = preparePresentationForValidation(presentation)

  // Veramo validity check for proof and data equality
  const response = await validateSDR(preparedPresentation, selectiveDislosure)
  sdrValidity = response.valid
  // Manually check for data comparisons (>, <, <=, >=)
  if (sdrValidity) {
    sdrValidity = manualComparisonCheck(selectiveDislosure, preparedPresentation)
  }

  updateCachedValue(sdrValidity, sdr)
  return sdrValidity
}

const updateCachedValue = (isValid: boolean, cachedValue: ICachedSDRequest) => {
  const status = isValid ? SDR_STATUS.APPROVED : SDR_STATUS.REJECTED
  const updatedValue: ICachedSDRequest = {
    ...cachedValue,
    expiresAt: add(new Date(), { minutes: CONFIG.APPROVED_EXPIRY_TIME }),
    status,
  }

  saveToCache({ key: cachedValue.id, value: JSON.stringify(updatedValue), duration: CONFIG.APPROVED_EXPIRY_TIME })
}

const preparePresentationForValidation = (presentation: VerifiablePresentation) => {
  const credentials: VerifiableCredential[] = presentation.verifiableCredential.map((c) => {
    if (c.credentialSubject.claims === undefined) {
      return
    }

    const claims: IClaim[] = JSON.parse(c.credentialSubject.claims)

    const preparedClaims = claims.reduce((result, claim) => {
      return { ...result, [claim.title]: JSON.stringify(claim.value) }
    }, {})

    return { ...c, credentialSubject: preparedClaims }
  })

  const preparedPresentation: VerifiablePresentation = {
    ...presentation,
    verifiableCredential: credentials,
  }

  return preparedPresentation
}

const extendWithCustomData = async (sdr: string, policy: IVerificationPolicy) => {
  const authority = await checkIfAuthorityDid(policy.issuer)

  if (!authority) {
    throw new Error('Authority not found!')
  }

  const dto: ISingleDisclosureDTO = {
    id: uuidv4(),
    metadata: {
      verifier: authority.alias,
      verifierDID: authority.did,
      title: `Verification request from ${authority.alias}`,
    },
    sdr,
  }

  const cacheValue: ICachedSDRequest = {
    ...dto,
    expiresAt: add(new Date(), { minutes: CONFIG.PENDING_EXPIRY_TIME }),
    status: SDR_STATUS.PENDING,
  }

  return { dto, cacheValue }
}

const manualComparisonCheck = (
  selectiveDislosure: ISelectiveDisclosureRequest,
  presentation: VerifiablePresentation
) => {
  const sdrComparions = selectiveDislosure.claims.filter((claim) => !claim.essential)

  if (sdrComparions.length <= 0) {
    return true
  }

  const presentationClaims = extractClaims(presentation)

  return sdrComparions.every((claim) => {
    const presentationClaim = presentationClaims.find((c) => {
      if (c[claim.claimType] !== undefined) {
        return c
      }
    })

    if (!presentationClaim) {
      return false
    }

    const comparisonValue = parseInt(claim.claimValue)
    const presentationClaimValue = parseInt(presentationClaim[claim.claimType])

    console.log(claim.claimType, { comparisonValue, presentationClaimValue, comparison: claim.reason })

    switch (claim.reason) {
      case COMPARISON_TYPE.EQUALS:
        return presentationClaimValue === comparisonValue
      case COMPARISON_TYPE.LESS_OR_EQUALS:
        return presentationClaimValue <= comparisonValue
      case COMPARISON_TYPE.LESS_THAN:
        return presentationClaimValue < comparisonValue
      case COMPARISON_TYPE.MORE_OR_EQUALS:
        return presentationClaimValue >= comparisonValue
      case COMPARISON_TYPE.MORE_THAN:
        return presentationClaimValue > comparisonValue
    }
  })
}

const extractClaims = (presentation: VerifiablePresentation) => {
  return presentation.verifiableCredential.reduce((aggr, current) => {
    const claims = current.credentialSubject
    return [...aggr, claims]
  }, [])
}
