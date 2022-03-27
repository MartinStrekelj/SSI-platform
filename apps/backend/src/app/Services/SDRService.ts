import { ICachedSDRequest, ISingleDisclosureDTO, IVerificationPolicy, SDR_STATUS } from '@ssi-ms/interfaces'
import { createSDR } from '../Veramo/SingleDisclosureRequest'
import { v4 as uuidv4 } from 'uuid'
import { add } from 'date-fns'
import { saveToCache } from './CacheService'

export const CONFIG = {
  PENDING_EXPIRY_TIME: parseInt(process.env.SDR_PENDING_MINUTES) || 5,
  APPROVED_EXPIRY_TIME: parseInt(process.env.SDR_PENDING_MINUTES) || 30,
}

export const createSDRfromPolicy = async (policy: IVerificationPolicy) => {
  const sdr = await createSDR({ claims: policy.fields.data, issuer: policy.issuer })
  const data = extendWithCustomData(sdr)
  saveToCache({ key: data.cacheValue.id, value: JSON.stringify(data.cacheValue), duration: CONFIG.PENDING_EXPIRY_TIME })
  return data
}

export const handleSDRRequest = async () => {
    
}

const extendWithCustomData = (sdr: string) => {
  const dto: ISingleDisclosureDTO = {
    id: uuidv4(),
    metadata: {
      verifier: 'test',
      title: 'test',
    },
    sdr,
  }

  const cacheValue: ICachedSDRequest = {
    ...dto,
    expiresAt: add(new Date(), { minutes: CONFIG.PENDING_EXPIRY_TIME }),
    status: SDR_STATUS.PENDING,
  }

  return { dto, cacheValue }
}
