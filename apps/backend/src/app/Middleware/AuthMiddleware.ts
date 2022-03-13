import { Request, Response, NextFunction } from 'express'
import { resolveRequestIdentity } from '../Services/AuthService'
import { resolveDID } from '../Veramo/DIDResolver'

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const { at } = req.cookies
  const requestIdentity = await resolveRequestIdentity(at)
  if (!requestIdentity) {
    return res.status(401).send({ message: 'Not authorized!' })
  }
  res.locals.did = requestIdentity
  return next()
}

// TODO -> then replace AuthGuard where necesarry
export const AuthorityAuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  return next()
  console.log(req.cookies)
  return await AuthGuard(req, res, () => {
    console.log(res.locals.did)
    return next()
  })
}

export const MobileAuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new Error('No auth token')
  }

  try {
    // remove bearer
    const token = req.headers.authorization.split(' ')[1]
    const resolvedDid = await resolveDID(token)
    console.log({ resolvedDid })

    if (resolvedDid.didDocument === null) {
      throw new Error('Invalid did')
    }

    res.locals.did = resolvedDid.didDocument.id
    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Not authorized!' })
  }
}
