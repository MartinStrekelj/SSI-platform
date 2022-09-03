import * as request from 'supertest'
import app from '../../main'
import { signJWTToken } from '../../app/Services/JWTService'
import { IVerifiableCredentialRevocationDTO, IVerificationPolicyDTO } from '@ssi-ms/interfaces'

const VALID_AUTHORITY_DID = 'did:ethr:rinkeby:0x036bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc'

const revokeBody: IVerifiableCredentialRevocationDTO = {
  issuer: VALID_AUTHORITY_DID,
  credential: 'CHANGE_ME',
  reason: 'TEST',
}

describe('Revocation API (e2e)', () => {
  let authorityToken: string
  let agent: request.SuperAgentTest
  let revokeHash: string

  beforeAll(() => {
    agent = request.agent(app)
    authorityToken = signJWTToken(VALID_AUTHORITY_DID)
    revokeHash = 'foo'
  })

  it('POST /api/revoke/ ~ Returns 400 bad body', async () => {
    const response = await agent
      .post('/api/revoke/')
      .set('Cookie', [`at=${authorityToken};`])
      .send(revokeBody)

    expect(response.status).toBe(400)
  })

  it('POST /api/revoke/ ~ Returns 400 bad credential', async () => {
    const response = await agent
      .post('/api/revoke/')
      .set('Cookie', [`at=${authorityToken};`])
      .send(revokeBody)

    expect(response.status).toBe(400)
  })

  it('DELETE /api/revoke/:uuid ~ Returns 200', async () => {
    expect(revokeHash).toBeDefined()

    const response = await agent.delete('/api/revoke/' + revokeHash).set('Cookie', [`at=${authorityToken};`])

    expect(response.status).toBe(400)
  })
})
