import * as request from 'supertest'
import app from '../../main'
import { signJWTToken } from '../../app/Services/JWTService'
import { IVerificationPolicyDTO } from '@ssi-ms/interfaces'

const VALID_DEV_DID = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'
const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

const policyBody: IVerificationPolicyDTO = {
  issuer: VALID_AUTHORITY_DID,
  schema: 'foo',
  claims: [{ title: 'foo', value: 'bar' }],
}

describe('Policy API (e2e)', () => {
  let authorityToken: string
  let holderToken: string
  let agent: request.SuperAgentTest
  let policyId: string

  beforeAll(() => {
    agent = request.agent(app)
    holderToken = signJWTToken(VALID_DEV_DID)
    authorityToken = signJWTToken(VALID_AUTHORITY_DID)
  })

  it('GET /api/policy/ ~ Returns 200', async () => {
    const response = await agent.get('/api/policy/').set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.policies).toBeDefined()
    policyId = response.body.policies[0].id
  })

  it('GET /api/policy/:uuid ~ Returns 200', async () => {
    expect(policyId).toBeDefined()

    const response = await agent.get('/api/policy/' + policyId).set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.policy).toBeDefined()
  })

  it('POST /api/policy/ ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/policy/')
      .set('Cookie', [`at=${authorityToken};`])
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Bad request')).toBeTruthy()
  })

  it('POST /api/policy/ ~ Returns 400 bad issuer', async () => {
    const response = await agent
      .post('/api/policy/')
      .set('Cookie', [`at=${holderToken};`])
      .send(policyBody)

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Not correct issuer')).toBeTruthy()
  })

  it('PUT /api/policy/:uuid ~ Returns 400 bad body', async () => {
    const response = await agent
      .put('/api/policy/' + policyId)
      .set('Cookie', [`at=${authorityToken};`])
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Bad request')).toBeTruthy()
  })

  it('PUT /api/policy/:uuid ~ Returns 400 bad issuer', async () => {
    const response = await agent
      .put('/api/policy/' + policyId)
      .set('Cookie', [`at=${holderToken};`])
      .send(policyBody)

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Not correct issuer')).toBeTruthy()
  })

  it('DELETE /api/policy/:uuid ~ Returns 400', async () => {
    const response = await agent
      .delete('/api/policy/' + policyId + '@')
      .set('Cookie', [`at=${holderToken};`])
      .send(policyBody)

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Error: Policy')).toBeTruthy()
  })
})
