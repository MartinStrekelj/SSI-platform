import { agent } from './setup'

const FILTER_STRING = 'Presentation of'

export const getLocalCredentials = async () => {
  const credentials = await agent.dataStoreORMGetVerifiableCredentials()
  return credentials.filter((c) => !c.verifiableCredential.type[1]?.includes(FILTER_STRING))
}

export const getLocalPresentations = async () => {
  const presentations = await agent.dataStoreORMGetVerifiablePresentations()
  return presentations
}
