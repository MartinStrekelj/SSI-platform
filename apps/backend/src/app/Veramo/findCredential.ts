import { agent } from './setup'

const findCredential = async (hash: string) => await agent.dataStoreGetVerifiableCredential({ hash })

export default findCredential
