import * as request from 'supertest'
import {
  CLAIM_TYPES,
  ICreatePresentationRequest,
  ISendVerifiableDataForSDR,
  IVerifiableCredentialDTO,
} from '../../../../../libs/interfaces/src'
import { signJWTToken } from '../../app/Services/JWTService'
import app from '../../main'

import { getAllVerificationPolicies } from '../../app/Services/VerificationPolicyService'

const VALID_DEV_DID = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'
const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

const presentationBody: ICreatePresentationRequest = {
  claims: [
    {
      title: 'test',
      type: CLAIM_TYPES.CHECKBOX,
      value: true,
      vc: '41e7186ea32e6fd116c437d11576b19e69050ae08c4eb65f8d07c04cc7d8cc51ed84fc23468c4ba65a54b0a64a4bafcb10adc28b899b768ed1ed42f8dd8a058e',
    },
  ],
}

const credentialBody: IVerifiableCredentialDTO = {
  issuer: VALID_AUTHORITY_DID,
  subject: VALID_DEV_DID,
  type: 'Dummy credential',
  schema: 'fooo',
  claims: [
    {
      title: 'test',
      type: CLAIM_TYPES.CHECKBOX,
      value: true,
    },
  ],
}

const verifyBody: ISendVerifiableDataForSDR = {
  sdrKey: 'CHANGE_ME',
  data: [
    {
      hash: 'foo',
      verifiableCredential: {
        type: ['a'],
        issuer: { id: 'foo' },
        proof: { type: 'JWT' },
        '@context': ['bar'],
        credentialSubject: { id: 'bar' },
        issuanceDate: 'tralala',
      },
    },
  ],
}

describe('CREDENATIALS (e2e)', () => {
  let bearerToken: string
  let holderToken: string
  let agent: request.SuperAgentTest
  let credentialHash: string
  let policyKey: string

  beforeAll(async () => {
    agent = request.agent(app)
    const response = await agent.post('/api/login').send({
      did: VALID_AUTHORITY_DID,
    })

    const cookieSetter = response.headers['set-cookie']
    // const cookie = cookieSetter.split(';')[0]
    bearerToken = cookieSetter[0].split(';')[0].split('=')[1]
    holderToken = signJWTToken(VALID_DEV_DID)

    const policies = await getAllVerificationPolicies()
    expect(policies.length).toBeGreaterThan(0)
    policyKey = policies[0].id
  })

  it('Token is defined', () => expect(bearerToken).toBeDefined())

  it('POST /issue ~ Returns 401 no token', async () => {
    const response = await agent.post('/api/credentials/issue').send(presentationBody)
    expect(response.status).toBe(401)
  })

  it('POST /issue ~ Returns 401 bad token', async () => {
    const response = await agent
      .post('/api/credentials/issue')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send(presentationBody)

    expect(response.status).toBe(401)
  })

  it('POST /issue ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/credentials/issue')
      .set('Cookie', [`at=${bearerToken};`])
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Not correct request type')
  })

  it('POST /issue ~ Returns 401 not same issuer as auth', async () => {
    const body: IVerifiableCredentialDTO = { ...credentialBody, issuer: VALID_DEV_DID }

    const response = await agent
      .post('/api/credentials/issue')
      .set('Cookie', [`at=${bearerToken};`])
      .send(body)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid issuer DID')
  })

  it('POST /issue ~ Returns 200', async () => {
    const response = await agent
      .post('/api/credentials/issue')
      .set('Cookie', [`at=${bearerToken};`])
      .send(credentialBody)

    expect(response.status).toBe(200)
    expect(response.body.message.startsWith('New verifiable credential')).toBeTruthy()
  })

  it('GET / ~ Returns 200', async () => {
    const response = await agent.get('/api/credentials/').set('Cookie', [`at=${bearerToken};`])

    expect(response.status).toBe(200)
    expect(response.body.credentials).toBeDefined()
    expect(response.body.credentials.length).toBeGreaterThanOrEqual(0)
    expect(response.body.credentials[0].id).toBeDefined()
    credentialHash = response.body.credentials[0].id
  })

  it('GET / ~ Returns 200', async () => {
    const response = await agent.get('/api/credentials/').set('Cookie', [`at=${holderToken};`])
    expect(response.status).toBe(200)
    expect(response.body.credentials).toBeDefined()
    expect(response.body.credentials.length).toBeGreaterThanOrEqual(0)
    expect(response.body.credentials[0].id).toBeDefined()
  })

  it('GET /:id ~ Returns 200', async () => {
    const response = await agent.get('/api/credentials/' + credentialHash).set('Cookie', [`at=${bearerToken};`])
    expect(response.status).toBe(200)
    expect(response.body.credential).toBeDefined()
    expect(response.body.credential.issuer).toBeDefined()
    expect(response.body.credential.issuer).toBe(VALID_AUTHORITY_DID)
  })

  it('POST /transfer ~ Returns 401 not right holder', async () => {
    const response = await agent
      .post('/api/credentials/transfer')
      .set('Cookie', [`at=${bearerToken};`])
      .send({ hash: credentialHash })
    expect(response.status).toBe(401)
    expect(response.body.message.startsWith('You must be the holder')).toBeTruthy()
  })

  it('POST /transfer ~ Returns 200', async () => {
    const response = await agent
      .post('/api/credentials/transfer')
      .set('Cookie', [`at=${holderToken};`])
      .send({ hash: credentialHash })
    expect(response.status).toBe(200)
    expect(response.body.qrcode.startsWith('data:image/png;base64')).toBeTruthy()
  })

  it('POST /verify ~ Returns 400 bad body', async () => {
    const response = await agent.post('/api/credentials/verify').send({ hello: 'world' })
    expect(response.status).toBe(400)
    expect(response.body.message.startsWith('Error: Bad request')).toBeTruthy()
  })

  it('POST /verify ~ Returns 400 no policy found', async () => {
    const response = await agent.post('/api/credentials/verify').send({ sdrKey: policyKey + '@' })
    expect(response.status).toBe(400)
    expect(response.body.message.startsWith('Error: No policy')).toBeTruthy()
  })

  it('POST /verify ~ Returns 200', async () => {
    const response = await agent.post('/api/credentials/verify').send({ sdrKey: policyKey })
    expect(response.status).toBe(200)
    expect(response.body.qrcode.startsWith('data:image/png;base64')).toBeTruthy()
  })

  it('POST /verify/data ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/credentials/verify/data')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
  })

  it('POST /verify/data ~ Returns 400 no cache hit', async () => {
    verifyBody.sdrKey = policyKey + '@'

    const response = await agent
      .post('/api/credentials/verify/data')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send(verifyBody)

    expect(response.status).toBe(400)
  })

  it('POST /verify/data ~ Returns 400 cache hit but no data', async () => {
    verifyBody.sdrKey = policyKey

    const response = await agent
      .post('/api/credentials/verify/data')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send(verifyBody)
    expect(response.status).toBe(400)
  })

  it('POST /presentation ~ Returns 401 if no header', async () => {
    const response = await agent.post('/api/credentials/presentation').send({
      hello: 'world',
    })
    expect(response.status).toBe(401)
    expect(response.body.reason).toBe('No auth token')
  })

  it('POST /presentation ~ Returns 401 if no header', async () => {
    const response = await agent.post('/api/credentials/presentation').set('authorization', 'application/json').send({
      hello: 'world',
    })
    expect(response.status).toBe(401)
    expect(response.body.reason).toBe('Invalid did')
  })

  it('POST /presentation ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/credentials/presentation')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send({
        hello: 'world',
      })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Bad body')
  })

  it('POST /presentation ~ Returns 200', async () => {
    const response = await agent
      .post('/api/credentials/presentation')
      .set('authorization', `Bearer ${VALID_DEV_DID}`)
      .send(presentationBody)

    expect(response.status).toBe(200)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('{"protected":')).toBeTruthy()
  })
})
