import { agent } from './setup'

export const getLocalCredentials = async () => {
  const credentials = await agent.dataStoreORMGetVerifiableCredentials()
  return credentials
}

export const getLocalPresentations = async () => {
  const presentations = await agent.dataStoreORMGetVerifiablePresentations()
  return presentations
}
