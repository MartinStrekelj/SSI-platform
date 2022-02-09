import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Request, Response } from 'express'
import { prepareVerifiableCredentialsDTOs } from '../../Services/DTOConverter'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'
import { listCredentialsWhereIssuer, listCredentialsWhereSubject } from '../../Veramo/ListCredentials'

export const listIssuedCredenetials = async (req: Request, res: Response) => {
  const { did } = req.params as { did: string }
}

export const listMyCredentials = async (req: Request, res: Response) => {
  const { did } = res.locals

  console.debug(did)

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
