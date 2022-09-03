import {
  ICachedSDRequest,
  isSendVerifiableDataForSDRequest,
  isUseVerificationPolicyRequest,
  SDR_COMPLETED,
  SDR_STATUS,
} from '@ssi-ms/interfaces'
import { Request, Response } from 'express'
import { readCacheKey, removeFromCache } from '../../Services/CacheService'
import { generateQRfromString } from '../../Services/QRService'
import { createSDRfromPolicy, handleSDRRequest } from '../../Services/SDRService'
import { getVerificationPolicyByUUID } from '../../Services/VerificationPolicyService'

export const useVerificationPolicy = async (req: Request, res: Response) => {
  try {
    const { body } = req

    if (!isUseVerificationPolicyRequest(body)) {
      throw new Error('Bad request body!')
    }

    const policy = await getVerificationPolicyByUUID(body.sdrKey)

    if (policy === null) {
      throw new Error('No policy found under this SDR key')
    }

    const { dto } = await createSDRfromPolicy(policy)
    const qrcode = await generateQRfromString(JSON.stringify(dto))
    return res.send({ message: 'Success', qrcode, id: dto.id })
  } catch (err) {
    return res.status(400).send({ message: `Error: ${err.message}`, qrcode: null, id: null })
  }
}

export const verifyVerifiableData = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!isSendVerifiableDataForSDRequest(body)) {
      throw new Error('Bad request body!')
    }

    const cacheHit = readCacheKey({ key: body.sdrKey }) as string | null

    if (cacheHit === null) {
      throw new Error('Verification request not found or expired!')
    }

    const sdrValue = JSON.parse(cacheHit) as ICachedSDRequest

    const validData = await handleSDRRequest({ sdr: sdrValue, presentation: body.presentation })

    if (!validData) {
      throw new Error('Not valid data!')
    }

    return res.send({ message: 'Success!' })
  } catch (e) {
    return res.status(400).send({ message: e.message })
  }
}

export const confirmVerificationProcess = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!isUseVerificationPolicyRequest(body)) {
      throw new Error('Bad request body!')
    }

    const cacheHit = readCacheKey({ key: body.sdrKey }) as string | null

    if (cacheHit === null) {
      throw new Error('Verification request not found or expired!')
    }

    const sdrValue = JSON.parse(cacheHit) as ICachedSDRequest

    // Clear cache value when user confirm the process and process completed
    if (SDR_COMPLETED.includes(sdrValue.status)) {
      removeFromCache({ key: body.sdrKey })
    }

    if (sdrValue.status === SDR_STATUS.REJECTED) {
      throw new Error('The verification process was rejected!')
    }

    return res.send({ message: sdrValue.status })
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
}
