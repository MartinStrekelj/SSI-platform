import { isUseVerificationPolicyRequest } from '@ssi-ms/interfaces'
import { Request, Response } from 'express'
import { generateQRfromString } from '../../Services/QRService'
import { createSDRfromPolicy } from '../../Services/SDRService'
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
