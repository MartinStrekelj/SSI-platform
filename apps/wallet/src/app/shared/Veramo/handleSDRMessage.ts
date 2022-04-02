import { agent } from './setup'

export const handleSDRRequest = async (sdr: string) => {
  const payload = agent.handleMessage({ raw: sdr, save: false })
  return payload
}
