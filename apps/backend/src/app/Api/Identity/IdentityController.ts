import { AUTHORITY_ROLES, IdentityResponse, IIdentityMetadata, ROLES } from '@ssi-ms/interfaces'
import { Response, Request } from 'express'
import { resolveJWTToken } from '../../Services/JWTService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'

import { agent } from '../../Veramo/setup'

// Used in combination with useUser hook on platform
export const resolveIdentityFromJWT = async (req: Request, res: Response) => {
  try {
    const { at } = req.cookies
    const resolvedJWT = resolveJWTToken(at)
    if (!resolvedJWT) {
      throw Error()
    }

    await agent.resolveDid({
      didUrl: resolvedJWT.did,
    })

    const authority = await checkIfAuthorityDid(resolvedJWT.did)
    const metadata: IIdentityMetadata = {}

    if (authority) {
      metadata.role = AUTHORITY_ROLES
      metadata.alias = authority.alias
    } else {
      metadata.role = [ROLES.HOLDER]
      metadata.alias = 'holder'
    }

    const response: IdentityResponse = {
      identity: {
        did: resolvedJWT.did,
        metadata,
      },
    }

    return res.send(response)
  } catch (e) {
    return res.status(401).send({ message: 'Access denied' })
  }
}
