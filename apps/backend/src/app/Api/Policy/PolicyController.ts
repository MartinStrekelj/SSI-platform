import { isAddVerificationPolicyRequest } from '@ssi-ms/interfaces'
import { Response, Request } from 'express'
import {
  createVerificationPolicy,
  getAllVerificationPolicies,
  getVerificationPolicyByUUID,
} from '../../Services/VerificationPolicyService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'

export const allPolicies = async (req: Request, res: Response) => {
  try {
    const policies = await getAllVerificationPolicies()
    return res.send({ message: 'Success', policies })
  } catch (error) {
    return res.status(400).send({ message: 'Error', policies: [] })
  }
}

export const getPolicy = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }
    if (!uuid) {
      throw new Error()
    }
    const policy = await getVerificationPolicyByUUID(uuid)

    if (policy === null) {
      throw new Error()
    }

    return res.send({ message: 'Success', policy })
  } catch (e) {
    return res.status(400).send({ message: 'Error', policy: null })
  }
}

export const postPolicy = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!isAddVerificationPolicyRequest(body)) {
      return new Error('Bad request body!')
    }

    if (body.issuer !== res.locals.did) {
      throw new Error('Not correct issuer')
    }

    if (!checkIfAuthorityDid(body.issuer)) {
      throw new Error('Only authorities can create verification policies')
    }

    const policy = await createVerificationPolicy(body)

    if (policy === null) {
      throw new Error('Error when creating new policy')
    }

    return res.send({ message: 'Success', policy })
  } catch (e) {
    return res.status(400).send({ message: e.message })
  }
}
