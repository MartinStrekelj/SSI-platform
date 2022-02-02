import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Request, Response } from 'express'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'
import { listCredentialsWhereIssuer, listCredentialsWhereSubject } from '../../Veramo/ListCredentials'

export const listIssuedCredenetials = async (req: Request, res: Response) => {
  const { did } = req.params as { did: string }
}

export const listMyCredentials = async (req: Request, res: Response) => {
  const did: string = 'did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp'
  const isAuthority = await checkIfAuthorityDid(did)

  let credentials: UniqueVerifiableCredential[] = []

  if (!isAuthority) {
    credentials = await listCredentialsWhereSubject(did)
  } else {
    credentials = await listCredentialsWhereIssuer(isAuthority.did)
  }

  // TODO prepare DTO && RESOLVE ISSUERS IN THE PROCESS

  return res.send({ message: credentials })
}
