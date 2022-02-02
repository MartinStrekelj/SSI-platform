import { IPackedDIDCommMessage, IDIDCommMessage, DIDCommMessagePacking } from '@veramo/did-comm'

import { agent } from './setup'

const createDIDMessage = async (
  message: IDIDCommMessage,
  packing: DIDCommMessagePacking = 'none'
): Promise<IPackedDIDCommMessage> =>
  await agent.packDIDCommMessage({
    packing,
    message,
  })

export default createDIDMessage
