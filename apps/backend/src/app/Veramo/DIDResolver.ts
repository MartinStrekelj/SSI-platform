import { agent } from './setup'

export const resolveDID = async (did: string) => await agent.resolveDid({ didUrl: did })
