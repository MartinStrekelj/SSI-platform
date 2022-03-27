import { isAddVerificationPolicyRequest } from '@ssi-ms/interfaces'
import { Response, Request } from 'express'
import { getSchemaByUUID } from '../../Services/SchemaService'
import {
  checkPolicyClaimsMatchSchema,
  createVerificationPolicy,
  getVerificationPoliciesByIssuer,
  getVerificationPolicyByUUID,
  removeVerificationPolicy,
  updateVerificationPolicy,
} from '../../Services/VerificationPolicyService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'

export const allPolicies = async (req: Request, res: Response) => {
  try {
    const { did } = res.locals as { did: string }
    const policies = await getVerificationPoliciesByIssuer(did)
    return res.send({ message: 'Success', policies })
  } catch (error) {
    return res.status(400).send({ message: 'Error', policies: [] })
  }
}

export const getPolicy = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }

    if (!uuid) {
      throw new Error('No uuid given')
    }

    const policy = await getVerificationPolicyByUUID(uuid)

    if (policy === null) {
      throw new Error('Policy not found')
    }

    // For frontend the schema title is more important than id
    const schemaUsed = await getSchemaByUUID(policy.schema)

    return res.send({ message: 'Success', policy: { ...policy, schema: schemaUsed.title } })
  } catch (e) {
    return res.status(400).send({ message: `Error: ${e.message}`, policy: null })
  }
}

export const postPolicy = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!isAddVerificationPolicyRequest(body)) {
      throw new Error('Bad request body!')
    }

    if (body.issuer !== res.locals.did) {
      throw new Error('Not correct issuer')
    }

    const isAuthority = await checkIfAuthorityDid(res.locals.did)

    if (!isAuthority) {
      throw new Error('Only authorities can create verification policies')
    }

    const schema = await getSchemaByUUID(body.schema)

    if (schema === null) {
      throw new Error('Schema not found')
    }

    const claimsMatchesSchema = checkPolicyClaimsMatchSchema(body.claims, schema)

    if (!claimsMatchesSchema) {
      throw new Error('Claims do not match the selected schema')
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

export const putPolicy = async (req: Request, res: Response) => {
  const { body } = req
  try {
    if (!isAddVerificationPolicyRequest(body)) {
      throw new Error('Bad request body!')
    }

    if (body.issuer !== res.locals.did) {
      throw new Error('Not correct issuer')
    }

    const isAuthority = await checkIfAuthorityDid(res.locals.did)

    if (!isAuthority) {
      throw new Error('Only authorities can update verification policies')
    }

    const policy = await getVerificationPolicyByUUID(body.id)

    if (policy === null) {
      throw new Error('Policy not found')
    }

    if (policy.issuer === res.locals.did) {
      throw new Error('You can only update policies issued by your identity')
    }

    const updatedPolicy = await updateVerificationPolicy(body)

    if (updatedPolicy === null) {
      throw new Error('Error when update new policy')
    }

    return res.send({ message: 'Success', policy: updatedPolicy })
  } catch (e) {
    return res.status(400).send({ message: e.message })
  }
}

export const deletePolicy = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }

    if (!uuid) {
      throw new Error('No uuid given')
    }

    const policy = await getVerificationPolicyByUUID(uuid)

    if (policy === null) {
      throw new Error('Policy not found')
    }

    await removeVerificationPolicy(policy.id)

    return res.send({ message: 'Success' })
  } catch (e) {
    return res.status(400).send({ message: `Error: ${e.message}` })
  }
}
