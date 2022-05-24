import {
  IFindCredentialByIdResponse,
  isTransferCredentialRequest,
  ITransferCredentialResponse,
  MESSAGE_TYPE,
  isCreatePresentationRequest,
  ICreatePresentationResponse,
} from '@ssi-ms/interfaces'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Request, Response } from 'express'
import { prepareDTOFromVC, prepareVerifiableCredentialsDTOs } from '../../Services/DTOConverter'
import { generateQRfromString } from '../../Services/QRService'
import { prepareCredentialsFromClaims } from '../../Services/PresentationService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'
import createDIDMessage from '../../Veramo/createDIDMessage'
import { createVCforPresentation } from '../../Veramo/IssueCredentials'
import findCredential from '../../Veramo/findCredential'
import { listCredentialsWhereIssuer, listCredentialsWhereSubject } from '../../Veramo/ListCredentials'
import { IDIDCommMessage } from '@veramo/did-comm'
import { applyIsRevokedCheck, isCredentialRevoked } from '../../Services/RevocationService'

export const listIssuedCredenetials = async (req: Request, res: Response) => {
  const { did } = req.params as { did: string }
  return res.status(400).send({ message: 'Not implemented!' })
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

  let credentialDTOs = prepareVerifiableCredentialsDTOs(credentials)
  credentialDTOs = await applyIsRevokedCheck(credentialDTOs)

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

  const isRevoked = await isCredentialRevoked(id)
  credentialDTO.isRevoked = isRevoked

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

export const createPresentation = async (req: Request, res: Response) => {
  const { body } = req
  const { did } = res.locals as { did: string }
  try {
    if (!isCreatePresentationRequest(body)) {
      throw new Error('Bad body')
    }

    const VCs = await prepareCredentialsFromClaims(body.claims)

    const message: IDIDCommMessage = {
      body: VCs,
      to: did,
      id: MESSAGE_TYPE.PRESENTATION,
      type: 'DIDCommV2Message-sent',
    }

    const didMessage = await createDIDMessage(message)

    const response: ICreatePresentationResponse = {
      message: didMessage.message,
    }

    return res.send(response)
  } catch (e) {
    return res.status(400).send({ message: e.message })
  }
}
