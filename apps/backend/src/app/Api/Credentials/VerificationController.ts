import { ICachedSDRequest, isSendVerifiableDataForSDRequest, isUseVerificationPolicyRequest } from '@ssi-ms/interfaces'
import { ok } from 'assert'
import { Request, Response } from 'express'
import { readCacheKey } from '../../Services/CacheService'
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
      throw new Error('SDR not found or expired!')
    }

    const sdrValue = JSON.parse(cacheHit) as ICachedSDRequest

    const validData = await handleSDRRequest({ sdr: sdrValue, presentation: body.presentation })

    if (!validData) {
      throw new Error('Not valid data!')
    }

    return res.send({ message: 'Success!' })
  } catch (e) {
    console.error(e.message)
    return res.status(400).send({ message: e.message })
  }
}
