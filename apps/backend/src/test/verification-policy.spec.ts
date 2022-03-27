import { ISchema, IVerificationPolicyDTO } from '@ssi-ms/interfaces'
import { getAllSchemas } from '../app/Services/SchemaService'
import {
  createVerificationPolicy,
  getAllVerificationPolicies,
  getVerificationPolicyByUUID,
  removeVerificationPolicy,
  updateVerificationPolicy,
} from '../app/Services/VerificationPolicyService'

const TEST_POLICY_ISSUER = 'Policy test'

describe('Verification policy tests', () => {
  let testPolicyId: string
  let testSchema: ISchema

  beforeAll(async () => {
    const schemas = await getAllSchemas()
    const schema = schemas[0]
    testSchema = schema
  }, 90000)

  it('VPs tests ~ create policy', async () => {
    const dummyPolicy: IVerificationPolicyDTO = {
      issuer: TEST_POLICY_ISSUER,
      schema: testSchema.id,
      claims: [{ title: 'foo', value: 'bar' }],
    }
    const policy = await createVerificationPolicy(dummyPolicy)
    expect(policy.issuer).toBe(TEST_POLICY_ISSUER)
    expect(policy.schema).toBe(testSchema.id)
    expect(JSON.stringify(policy.fields.data)).toBe(JSON.stringify(dummyPolicy.claims))
    testPolicyId = policy.id
  })

  it('VPs tests ~ find policies', async () => {
    const policies = await getAllVerificationPolicies()
    expect(policies.length).toBeGreaterThan(0)
  })

  it('VPs tests ~ find policy by uuid', async () => {
    const policy = await getVerificationPolicyByUUID(testPolicyId)
    expect(policy.issuer).toBe(TEST_POLICY_ISSUER)

    const notFoundPolicy = await getVerificationPolicyByUUID('not-found-uuid')
    expect(notFoundPolicy).toBeNull()
  })

  it('VPs tests ~ update policy', async () => {
    const data: IVerificationPolicyDTO = {
      id: testPolicyId,
      schema: testSchema.id,
      issuer: TEST_POLICY_ISSUER,
      claims: [{ title: 'updated', value: 'foo' }],
    }

    const updatedPolicy = await updateVerificationPolicy(data)
    expect(updatedPolicy.id).toBe(testPolicyId)
    expect(updatedPolicy.issuer).toBe(TEST_POLICY_ISSUER)
    expect(updatedPolicy.schema).toBe(testSchema.id)
    expect(JSON.stringify(updatedPolicy.fields.data)).toBe(JSON.stringify(data.claims))
  })

  it('VPs tests ~ remove policy', async () => {
    await removeVerificationPolicy(testPolicyId)
    const policy = await getVerificationPolicyByUUID(testPolicyId)
    expect(policy).toBeNull()
  })
})
