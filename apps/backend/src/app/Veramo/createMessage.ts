import {
  IPackedDIDCommMessage,
  IDIDCommMessage,
  DIDCommMessagePacking,
} from '@veramo/did-comm';

import { agent } from './setup';

export const createDIDMessage = async (
  message: IDIDCommMessage,
  packing: DIDCommMessagePacking = 'none'
): Promise<IPackedDIDCommMessage> =>
  await agent.packDIDCommMessage({
    packing,
    message,
  });
