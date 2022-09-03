import { UniqueVerifiableCredential } from '@veramo/data-store'
import { agent } from '../app/Veramo/setup'
import {
  insertRevokeVerifiableCredential,
  isCredentialRevoked,
  filterRevokedCredentials,
  undoRevocationForVC,
} from '../app/Services/RevocationService'

describe('Revocations tests', () => {
  let credential: UniqueVerifiableCredential
  let credentials: UniqueVerifiableCredential[]

  beforeAll(async () => {
    const vcs = await agent.dataStoreORMGetVerifiableCredentials()
    credential = vcs[0]
    credentials = vcs
  })

  it('Revocations tests ~ should revoke VC', async () => {
    const DUMMY_REASON = 'revoked for testing purposes'

    const response = await insertRevokeVerifiableCredential({
      credential: credential.hash,
      issuer: credential.verifiableCredential.issuer.id,
      reason: DUMMY_REASON,
    })

    expect(response.id).toBeDefined()
    expect(response.credential).toBe(credential.hash)
    expect(response.issuer).toBe(credential.verifiableCredential.issuer.id)
    expect(response.reason).toBe(DUMMY_REASON)
  })

  it('Revocations tests ~ VC should be revoked', async () => {
    const isRevoked = await isCredentialRevoked(credential.hash)
    const filteredVCs = await filterRevokedCredentials(credentials)

    expect(isRevoked).toBeTruthy()
    expect(filteredVCs.length < credentials.length).toBeTruthy()
  })

  it('Revocations tests ~ VC should undo revoke', async () => {
    await undoRevocationForVC(credential.hash)

    const isRevoked = await isCredentialRevoked(credential.hash)
    const filteredVCs = await filterRevokedCredentials(credentials)

    expect(isRevoked).toBeFalsy()
    expect(filteredVCs.length === credentials.length).toBeFalsy()
  })
})
