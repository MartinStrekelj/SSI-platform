import * as request from 'supertest'
import app from '../../main'
import { signJWTToken } from '../../app/Services/JWTService'
import { ROLES } from '@ssi-ms/interfaces'

const VALID_DEV_DID = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'
const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

describe('Identity API (e2e)', () => {
  let authorityToken: string
  let holderToken: string
  let agent: request.SuperAgentTest

  beforeAll(() => {
    agent = request.agent(app)
    holderToken = signJWTToken(VALID_DEV_DID)
    authorityToken = signJWTToken(VALID_AUTHORITY_DID)
  })

  it('GET /api/identity ~ Returns 401 bad token', async () => {
    const response = await agent.get('/api/identity').set('Cookie', [`at=${holderToken + '1'};`])

    console.log(response.body)

    expect(response.status).toBe(401)
  })

  it('GET /api/identity ~ Returns 200 as authority', async () => {
    const response = await agent.get('/api/identity').set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(200)
    expect(response.body.identity.metadata).toBeDefined()
    expect(response.body.identity.metadata.role).toBeDefined()
    expect(response.body.identity.metadata.role.includes(ROLES.ISSUER)).toBeTruthy()
    expect(response.body.identity.metadata.role.includes(ROLES.VERIFICATOR)).toBeTruthy()
  })

  it('GET /api/identity ~ Returns 200 as holder', async () => {
    const response = await agent.get('/api/identity').set('Cookie', [`at=${holderToken};`])

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.identity.metadata).toBeDefined()
    expect(response.body.identity.metadata.role).toBeDefined()
    expect(response.body.identity.metadata.role.includes(ROLES.HOLDER)).toBeTruthy()
  })

  it('GET /api/identity/logout ~ Returns 200', async () => {
    const response = await agent.get('/api/identity').set('Cookie', [`at=${holderToken};`])

    expect(response.status).toBe(200)
  })
})
