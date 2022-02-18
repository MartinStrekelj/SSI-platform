import {
  IFindCredentialByIdResponse,
  IGenericResponse,
  isTransferCredentialRequest,
  ITransferCredentialResponse,
  MESSAGE_TYPE,
} from '@ssi-ms/interfaces'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Request, Response } from 'express'
import {
  prepareDTOFromVC,
  prepareVerifiableCredentialsDTO,
  prepareVerifiableCredentialsDTOs,
} from '../../Services/DTOConverter'
import { generateQRfromString } from '../../Services/QRService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'
import createDIDMessage from '../../Veramo/createDIDMessage'
import findCredential from '../../Veramo/findCredential'
import { listCredentialsWhereIssuer, listCredentialsWhereSubject } from '../../Veramo/ListCredentials'

export const listIssuedCredenetials = async (req: Request, res: Response) => {
  const { did } = req.params as { did: string }
}

export const listMyCredentials = async (req: Request, res: Response) => {
  const { did } = res.locals

  const isAuthority = await checkIfAuthorityDid(did)

  let credentials: UniqueVerifiableCredential[] = []

  if (!isAuthority) {
    credentials = await listCredentialsWhereSubject(did)
  } else {
    credentials = await listCredentialsWhereIssuer(isAuthority.did)
  }

  const credentialDTOs = prepareVerifiableCredentialsDTOs(credentials)

  return res.send({ credentials: credentialDTOs })
}

export const findCredentialById = async (req: Request, res: Response) => {
  const { did } = res.locals
  const { id } = req.params as { id: string }
  const credential = await findCredential(id)
  const hasAccessToCredential = credential.credentialSubject.id === did || credential.issuer.id === did

  if (!hasAccessToCredential) {
    return res.status(400).send({ message: 'You must be the holder of credential for transfer' })
  }

  const credentialDTO = prepareDTOFromVC(credential)

  const response: IFindCredentialByIdResponse = { credential: credentialDTO }
  return res.send(response)
}

export const transferCredential = async (req: Request, res: Response) => {
  const { did } = res.locals
  const { body } = req

  if (!isTransferCredentialRequest(body)) {
    return res.status(400).send({ message: 'Bad request!' })
  }

  const credential = await findCredential(body.hash)
  const isCorrectHolder = credential.credentialSubject.id === did

  if (!isCorrectHolder) {
    return res.status(401).send({ message: 'You must be the holder of credential for transfer' })
  }

  try {
    const message = await createDIDMessage({
      to: did,
      id: MESSAGE_TYPE.TRANSFER,
      type: 'DIDCommV2Message-sent',
      body: { credential },
    })

    const qrcode = await generateQRfromString(message.message)
    const response: ITransferCredentialResponse = { qrcode: qrcode }
    return res.send(response)
  } catch (err: any) {
    console.error(err.message)
    return res.status(400).send({ message: 'something went wrong!' })
  }
}
