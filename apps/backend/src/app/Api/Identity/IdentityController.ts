import { AUTHORITY_ROLES, IdentityResponse, IIdentityMetadata, ROLES } from '@ssi-ms/interfaces'
import { Response, Request } from 'express'
import { resolveRequestIdentity } from '../../Services/AuthService'
import { removeCookie } from '../../Services/CookieService'
import { checkIfAuthorityDid } from '../../Veramo/AuthorityDIDs'

// Provides identity resolution for platform
export const resolveIdentityFromJWT = async (req: Request, res: Response) => {
  try {
    const { at } = req.cookies
    const requestIdentity = await resolveRequestIdentity(at)

    if (!requestIdentity) {
      throw new Error('Could not resolve identity')
    }

    const authority = await checkIfAuthorityDid(requestIdentity)
    const metadata: IIdentityMetadata = {}

    if (authority) {
      metadata.role = AUTHORITY_ROLES
      metadata.alias = authority.alias
    } else {
      metadata.role = [ROLES.HOLDER]
      metadata.alias = ROLES.HOLDER
    }

    const response: IdentityResponse = {
      identity: {
        did: requestIdentity,
        metadata,
      },
    }

    return res.send(response)
  } catch (e) {
    return res.status(401).send({ message: 'Access denied' })
  }
}

export const logoutUserAction = async (req: Request, res: Response) => {
  removeCookie(res)
  return res.send({})
}
