import { isCreateVerifiableCredentialRequest } from '@ssi-ms/interfaces'
import { Request, Response } from 'express'
import { createVerifiableCredential } from '../../Veramo/IssueCredentials'

export const IssueNewCrendetial = async (req: Request, res: Response) => {
  const { body } = req

  if (!isCreateVerifiableCredentialRequest(body)) {
    return res.status(400).send({ message: 'Not correct request type' })
  }

  const { did: issuerDid } = res.locals

  if (body.issuer !== issuerDid) {
    return res.status(401).send({ message: 'Invalid issuer DID' })
  }

  const newVerifiableCredential = await createVerifiableCredential(body)

  if (!newVerifiableCredential) {
    return res.status(400).send({ message: 'Error when creating a new verifiable credential' })
  }

  console.debug(newVerifiableCredential)

  return res.send({ message: `New verifiable credential ${newVerifiableCredential.type} successfully created!` })
}
