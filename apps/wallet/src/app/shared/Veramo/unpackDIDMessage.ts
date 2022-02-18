import { agent } from './setup'

const unpackDIDMessage = async (message: string) => await agent.unpackDIDCommMessage({ message })

export default unpackDIDMessage
