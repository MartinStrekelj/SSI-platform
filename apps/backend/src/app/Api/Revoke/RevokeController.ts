import { Response, Request } from 'express'
import { IGenericResponse, isVCRevocationRequest } from '@ssi-ms/interfaces'
import findCredential from '../../Veramo/findCredential'
import { findRevocation, insertRevokeVerifiableCredential, undoRevocationForVC } from '../../Services/RevocationService'

export const revokeAction = async (req: Request, res: Response) => {
  try {
    const { did } = res.locals
    const { body } = req

    if (!isVCRevocationRequest(body)) {
      throw new Error('Bad request body')
    }

    const credential = await findCredential(body.credential)

    if (!credential) {
      throw new Error('Credential could not be found!')
    }

    if (credential.issuer.id !== did) {
      throw new Error('You can only revoke credentials issued by you!')
    }

    const revocation = await insertRevokeVerifiableCredential(body)

    if (revocation === null) {
      throw new Error('Unexpected error with revocation')
    }

    const response: IGenericResponse = { message: `Credential is succesfully revoked due to: ${revocation.reason}` }
    return res.send(response)
  } catch (e) {
    const response: IGenericResponse = { message: e.message }
    return res.status(400).send(response)
  }
}
export const undoRevokeAction = async (req: Request, res: Response) => {
  try {
    const { did } = res.locals
    const { hash } = req.params

    const revocation = await findRevocation(hash)

    if (revocation === null) {
      throw new Error('Revocation could not be found!')
    }

    if (revocation.issuer !== did) {
      throw new Error('You can only undo revoke for credentials issued by you!')
    }

    await undoRevocationForVC(hash)

    const response: IGenericResponse = { message: 'Succesfully removed revocation!' }
    return res.send(response)
  } catch (e) {
    const response: IGenericResponse = { message: e.message }
    return res.status(400).send(response)
  }
}
