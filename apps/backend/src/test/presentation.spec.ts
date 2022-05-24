import { CLAIM_TYPES, IPresentationClaim } from '@ssi-ms/interfaces'
import { prepareCredentialsFromClaims } from '../app/Services/PresentationService'

const TEST_VC: IPresentationClaim[] = [
  {
    title: 'test',
    type: CLAIM_TYPES.CHECKBOX,
    value: true,
    vc: '41e7186ea32e6fd116c437d11576b19e69050ae08c4eb65f8d07c04cc7d8cc51ed84fc23468c4ba65a54b0a64a4bafcb10adc28b899b768ed1ed42f8dd8a058e',
  },
]

const TEST_VC2 = [
  ...TEST_VC,
  {
    title: 'Another one',
    type: CLAIM_TYPES.CHECKBOX,
    value: true,
    vc: 'e3301068cea7a59db3f50f4bad62c4791c02fad02042ac420e6e62264bf28aee613ba72c0153c235326e7b6d03e6c13940eed27aa68b99d615b3987c948dedc1',
  },
]

const TEST_VC3 = [
  ...TEST_VC2,
  {
    title: 'Another one123',
    type: CLAIM_TYPES.CHECKBOX,
    value: true,
    vc: 'e3301068cea7a59db3f50f4bad62c4791c02fad02042ac420e6e62264bf28aee613ba72c0153c235326e7b6d03e6c13940eed27aa68b99d615b3987c948dedc1',
  },
]

describe('Create presentation spec', () => {
  it('Presentation tests ~ should accept single subset of credential', async () => {
    const vcs = await prepareCredentialsFromClaims(TEST_VC)
    expect(vcs.length).toBe(TEST_VC.length)
  })

  it('Presentation tests ~ should accept subset of multiple credentials', async () => {
    const vcs = await prepareCredentialsFromClaims(TEST_VC2)
    expect(vcs.length).toBe(TEST_VC2.length)
  })

  it('Presentation tests ~ should decline', async () => {
    try {
      await prepareCredentialsFromClaims(TEST_VC3)
    } catch (error) {
      expect(error.message).toBe('Invalid credential DTO')
    }
  })
})
