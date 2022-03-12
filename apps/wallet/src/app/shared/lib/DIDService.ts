import { agent } from '../Veramo/setup'

export const getMyDid = async () => {
  const dids = await agent.didManagerFind({ alias: 'holder' })
  return dids[0]
}
