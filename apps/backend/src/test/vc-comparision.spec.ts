import { CLAIM_TYPES, COMPARISON_TYPE, IClaim, IVerificationPolicy } from '@ssi-ms/interfaces'
import { createSDRfromPolicy, handleSDRRequest } from '../app/Services/SDRService'
import { getAuthority } from '../app/Veramo/AuthorityDIDs'
import { createVerifiableCredential } from '../app/Veramo/IssueCredentials'
import { agent } from '../app/Veramo/setup'

const EQUAL_CLAIMS = [
  {
    title: 'equals_test',
    value: true,
    type: CLAIM_TYPES.CHECKBOX,
  },
  {
    title: 'equals_test2',
    value: 1,
    type: CLAIM_TYPES.NUMERIC,
    comparison: COMPARISON_TYPE.EQUALS,
  },
  {
    title: 'equals_select',
    value: CLAIM_TYPES.SELECT,
    type: CLAIM_TYPES.SELECT,
  },
]

const MORE_THAN_CLAIMS = [
  {
    title: 'more_or_equals',
    value: 2,
    type: CLAIM_TYPES.NUMERIC,
    comparison: COMPARISON_TYPE.MORE_OR_EQUALS,
  },
  {
    title: 'more_than',
    value: 2,
    type: CLAIM_TYPES.NUMERIC,
    comparison: COMPARISON_TYPE.MORE_THAN,
  },
]

const LESS_THAN_CLAIMS = [
  {
    title: 'x',
    value: 2,
    type: CLAIM_TYPES.NUMERIC,
    comparison: COMPARISON_TYPE.LESS_OR_EQUALS,
  },
  {
    title: 'y',
    value: 2,
    type: CLAIM_TYPES.NUMERIC,
    comparison: COMPARISON_TYPE.LESS_THAN,
  },
]

describe('VC verification tests', () => {
  let verificationPolicy: IVerificationPolicy
  let VP_METADATA = {
    id: 'test_vp',
    schema: 'test_schema',
    issuer: '',
  }
  let testClaims: IClaim[]

  beforeAll(async () => {
    const authority = await getAuthority('RS')
    VP_METADATA = { ...VP_METADATA, issuer: authority.did }
  })

  it('VC verification tests ~ === comparions', async () => {
    testClaims = EQUAL_CLAIMS
    verificationPolicy = {
      ...VP_METADATA,
      fields: {
        data: testClaims,
      },
    }

    const sdr = await createSDRfromPolicy(verificationPolicy)
    expect(typeof sdr.cacheValue.sdr).toBe('string')

    const vc = await createVerifiableCredential(
      {
        claims: testClaims,
        subject: verificationPolicy.issuer,
        type: 'test_type',
        issuer: verificationPolicy.issuer,
      },
      false
    )

    const vc2 = await createVerifiableCredential(
      {
        claims: MORE_THAN_CLAIMS,
        subject: verificationPolicy.issuer,
        type: 'test_type',
        issuer: verificationPolicy.issuer,
      },
      false
    )

    expect(vc).toBeTruthy()
    expect(vc2).toBeTruthy()

    if (!vc || !vc2) {
      return
    }

    const presentation = await agent.createVerifiablePresentation({
      save: false,
      presentation: {
        holder: vc.issuer.id,
        verifiableCredential: [vc],
      },
      proofFormat: 'jwt',
    })

    const presentation2 = await agent.createVerifiablePresentation({
      save: false,
      presentation: {
        holder: vc.issuer.id,
        verifiableCredential: [vc2],
      },
      proofFormat: 'jwt',
    })

    expect(presentation).toBeTruthy()

    const validData = await handleSDRRequest({ sdr: sdr.cacheValue, presentation })
    const validData2 = await handleSDRRequest({ sdr: sdr.cacheValue, presentation: presentation2 })
    expect(validData).toBe(true)
    expect(validData2).toBe(false)
  })

  it('VC verification tests ~ > & >= comparions', async () => {
    testClaims = LESS_THAN_CLAIMS
    verificationPolicy = {
      ...VP_METADATA,
      fields: {
        data: testClaims,
      },
    }

    const sdr = await createSDRfromPolicy(verificationPolicy)
    expect(typeof sdr.cacheValue.sdr).toBe('string')

    const vc = await createVerifiableCredential(
      {
        claims: testClaims.map((c) => {
          return { ...c, value: (c.value as number) - 1 }
        }),
        subject: verificationPolicy.issuer,
        type: 'test_type',
        issuer: verificationPolicy.issuer,
      },
      false
    )

    expect(vc).toBeTruthy()
    if (!vc) return

    const presentation = await agent.createVerifiablePresentation({
      save: false,
      presentation: {
        holder: vc.issuer.id,
        verifiableCredential: [vc, vc],
      },
      proofFormat: 'jwt',
    })

    expect(presentation).toBeTruthy()

    const validData = await handleSDRRequest({ sdr: sdr.cacheValue, presentation })
    expect(validData).toBe(true)
  })

  it('VC verification tests ~ < & <= comparions', async () => {
    testClaims = MORE_THAN_CLAIMS
    verificationPolicy = {
      ...VP_METADATA,
      fields: {
        data: testClaims,
      },
    }

    const sdr = await createSDRfromPolicy(verificationPolicy)
    expect(typeof sdr.cacheValue.sdr).toBe('string')

    const vc = await createVerifiableCredential(
      {
        claims: testClaims.map((c) => {
          return { ...c, value: (c.value as number) + 1 }
        }),
        subject: verificationPolicy.issuer,
        type: 'test_type',
        issuer: verificationPolicy.issuer,
      },
      false
    )

    expect(vc).toBeTruthy()
    if (!vc) return

    const presentation = await agent.createVerifiablePresentation({
      save: false,
      presentation: {
        holder: vc.issuer.id,
        verifiableCredential: [vc, vc],
      },
      proofFormat: 'jwt',
    })

    expect(presentation).toBeTruthy()

    const validData = await handleSDRRequest({ sdr: sdr.cacheValue, presentation })
    expect(validData).toBe(true)
  })
})
