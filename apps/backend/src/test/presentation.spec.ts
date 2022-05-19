import { CLAIM_TYPES, IPresentationClaim } from '@ssi-ms/interfaces'

const TEST_DATA: IPresentationClaim[] = [
  {
    title: 'test',
    type: CLAIM_TYPES.CHECKBOX,
    value: true,
    vc: '41e7186ea32e6fd116c437d11576b19e69050ae08c4eb65f8d07c04cc7d8cc51ed84fc23468c4ba65a54b0a64a4bafcb10adc28b899b768ed1ed42f8dd8a058e',
  },
  {
    title: 'Another one',
    type: CLAIM_TYPES.CHECKBOX,
    value: true,
    vc: 'e3301068cea7a59db3f50f4bad62c4791c02fad02042ac420e6e62264bf28aee613ba72c0153c235326e7b6d03e6c13940eed27aa68b99d615b3987c948dedc1',
  },
]

describe('Create presentation spec', () => {
  it('Presentation tests ~ should accept', () => {
    console.log(TEST_DATA)
  })

  it('Presentation tests ~ should decline', () => {})
})
