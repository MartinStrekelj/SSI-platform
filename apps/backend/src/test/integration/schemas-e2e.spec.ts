import * as request from 'supertest'
import app from '../../main'
import { signJWTToken } from '../../app/Services/JWTService'
import { CLAIM_TYPES, ISchema, IVerificationPolicyDTO } from '@ssi-ms/interfaces'

const VALID_DEV_DID = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'
const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

const schemaBody: ISchema = {
  author: VALID_AUTHORITY_DID,
  title: 'TEST',
  fields: {
    data: [{ title: 'foo', type: CLAIM_TYPES.TEXT }],
  },
  display: true,
}

describe('Schemas API (e2e)', () => {
  let authorityToken: string
  let holderToken: string
  let agent: request.SuperAgentTest
  let schemaId: string
  let createdSchema: string

  beforeAll(() => {
    agent = request.agent(app)
    holderToken = signJWTToken(VALID_DEV_DID)
    authorityToken = signJWTToken(VALID_AUTHORITY_DID)
  })

  it('GET /api/schemas/ ~ Returns 200', async () => {
    const response = await agent.get('/api/schemas/').set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.schemas).toBeDefined()
    schemaId = response.body.schemas[0].id
  })

  it('GET /api/schemas/:uuid ~ Returns 200', async () => {
    expect(schemaId).toBeDefined()

    const response = await agent.get('/api/schemas/' + schemaId).set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.schema).toBeDefined()
  })

  it('POST /api/schema/ ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/schemas/')
      .set('Cookie', [`at=${authorityToken};`])
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Not correct')).toBeTruthy()
  })

  it('POST /api/schemas/ ~ Returns 400 bad author', async () => {
    const test = { ...schemaBody }
    test.author = VALID_DEV_DID

    const response = await agent
      .post('/api/schemas/')
      .set('Cookie', [`at=${authorityToken};`])
      .send(test)

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Author')).toBeTruthy()
  })

  it('POST /api/schemas/ ~ Returns 200', async () => {
    const response = await agent
      .post('/api/schemas/')
      .set('Cookie', [`at=${authorityToken};`])
      .send(schemaBody)

    console.log('response:', response.body)
    console.log({ schemaBody })

    expect(response.status).toBe(200)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Success')).toBeTruthy()
    expect(response.body.schema).toBeDefined()
    createdSchema = response.body.schema.id
  })

  it('PUT /api/schemas/:uuid ~ Returns 400 bad body', async () => {
    expect(createdSchema).toBeDefined()
    const response = await agent
      .put('/api/schemas/' + createdSchema)
      .set('Cookie', [`at=${authorityToken};`])
      .send({ hello: 'world' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Not correct')).toBeTruthy()
  })

  it('PUT /api/schemas/:uuid ~ Returns 200 updated', async () => {
    expect(createdSchema).toBeDefined()
    const response = await agent
      .put('/api/schemas/' + createdSchema)
      .set('Cookie', [`at=${authorityToken};`])
      .send(schemaBody)

    expect(response.status).toBe(200)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Success')).toBeTruthy()
  })

  it('DELETE /api/schemas/:uuid ~ Returns 200', async () => {
    expect(createdSchema).toBeDefined()
    const response = await agent.delete('/api/schemas/' + createdSchema).set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.message).toBeDefined()
    expect(response.body.message.startsWith('Success')).toBeTruthy()
  })
})
