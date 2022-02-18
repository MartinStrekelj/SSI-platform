import { agent } from './setup'

const getLocalCredentials = async () => {
  const credentials = await agent.dataStoreORMGetVerifiableCredentials()
  return credentials
}

export default getLocalCredentials
