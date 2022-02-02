import { agent } from './setup'

export const listAllStoredCredentials = async () => {
  return await agent.dataStoreORMGetVerifiableCredentials()
}

export const listCredentialsWhereIssuer = async (did: string) => {
  return await agent.dataStoreORMGetVerifiableCredentials({ where: [{ column: 'issuer', value: [did] }] })
}

export const listCredentialsWhereSubject = async (did: string) => {
  const allCredentials = await agent.dataStoreORMGetVerifiableCredentialsByClaims() // does not work by default
  return allCredentials.filter((credential) => credential.verifiableCredential.credentialSubject.id === did)
}
