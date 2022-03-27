import {
  CLAIM_TYPES,
  ICachedSDRequest,
  ISingleDisclosureDTO,
  IVerificationPolicy,
  IVerificationPolicyDTO,
  SDR_STATUS,
} from '@ssi-ms/interfaces'
import { createVerificationPolicy, removeVerificationPolicy } from '../app/Services/VerificationPolicyService'
import { CONFIG, createSDRfromPolicy } from '../app/Services/SDRService'
import { agent } from '../app/Veramo/setup'
import { isBefore, isAfter, add } from 'date-fns'
import { readCacheKey } from '../app/Services/CacheService'
import { generateQRfromString } from '../app/Services/QRService'
import { ICredentialRequestInput } from '@veramo/selective-disclosure'

const SCHEMA_ID = '330af147-9fbb-41e4-b721-0623133079a7'

describe('SDR tests', () => {
  let issuerDID: string
  let cachedValue: ICachedSDRequest
  let SDRdto: ISingleDisclosureDTO
  let policy: IVerificationPolicy

  beforeAll(async () => {
    const identifiers = await agent.didManagerFind()
    issuerDID = identifiers[0].did

    const policyDTO: IVerificationPolicyDTO = {
      issuer: issuerDID,
      schema: SCHEMA_ID,
      claims: [{ title: 'test', type: CLAIM_TYPES.CHECKBOX, value: true }],
    }
    const newPolicy = await createVerificationPolicy(policyDTO)
    policy = newPolicy
  }, 10000)

  it('SDR tests ~ Creates SDR DTO from policy', async () => {
    if (!policy) {
      console.error('No policy created')
      expect(0).toBe(1)
      return
    }

    const { dto, cacheValue } = await createSDRfromPolicy(policy)

    expect(dto.id).toBe(cacheValue.id)
    expect(dto.sdr).toBe(cacheValue.sdr)
    expect(JSON.stringify(dto) === JSON.stringify(cacheValue)).toBeFalsy()
    expect(cacheValue.status).toBe(SDR_STATUS.PENDING)

    cachedValue = cacheValue
    SDRdto = dto
  })

  it('SDR tests ~ Correct expiry datetime for cached value', () => {
    const shouldBeBefore = add(new Date(), { minutes: CONFIG.PENDING_EXPIRY_TIME - 1 })
    const shouldBeAfter = add(new Date(), { minutes: CONFIG.PENDING_EXPIRY_TIME + 1 })

    expect(isBefore(shouldBeBefore, cachedValue.expiresAt)).toBeTruthy()
    expect(isAfter(shouldBeAfter, cachedValue.expiresAt)).toBeTruthy()
  })

  it('SDR tests ~ Retrive data from cache', () => {
    const cacheHit = readCacheKey({ key: cachedValue.id })
    expect(cacheHit).not.toBeNull()
    expect(cacheHit).toBe(JSON.stringify(cachedValue))
  })

  it('SDR tests ~ Transforms DTO to QR code', async () => {
    expect(SDRdto?.id).toBeDefined()
    const qrcode = await generateQRfromString(JSON.stringify(SDRdto))
    expect(qrcode.startsWith('data:image/png;base64')).toBeTruthy()
  })

  it('SDR tests ~ SDR message should match policy', async () => {
    const message = await agent.handleMessage({ raw: cachedValue.sdr, save: false })
    const { claims: sdrClaims } = message.data as { claims: ICredentialRequestInput[] }
    expect(sdrClaims.length).toBe(policy.fields.data.length)
    expect(sdrClaims[0].claimType).toBe(policy.fields.data[0].title)
    expect(sdrClaims[0].claimValue).toBe(JSON.stringify(policy.fields.data[0].value))
  })

  afterAll(async () => {
    await removeVerificationPolicy(policy.id)
  })
})
