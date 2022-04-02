import { ICachedSDRequest, IClaim, ISingleDisclosureDTO, IVerificationPolicy, SDR_STATUS } from '@ssi-ms/interfaces'
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
  const message = await agent.handleMessage({ raw: sdr.sdr, save: false })
  const selectiveDislosure = message.data as ISelectiveDisclosureRequest
  const preparedPresentation = preparePresentationForValidation(presentation)

  const response = await validateSDR(preparedPresentation, selectiveDislosure)
  updateCachedValue(response.valid, sdr)
  return response.valid
}

const updateCachedValue = (isValid: boolean, cachedValue: ICachedSDRequest) => {
  const status = isValid ? SDR_STATUS.APPROVED : SDR_STATUS.REJECTED
  const updatedValue: ICachedSDRequest = {
    ...cachedValue,
    expiresAt: add(new Date(), { minutes: CONFIG.APPROVED_EXPIRY_TIME }),
    status,
  }

  saveToCache({ key: cachedValue.id, value: JSON.stringify(cachedValue), duration: CONFIG.APPROVED_EXPIRY_TIME })
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
      title: 'To be implemented in policy',
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
