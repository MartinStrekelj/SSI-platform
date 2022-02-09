import { Request, Response, NextFunction } from 'express'
import { resolveRequestIdentity } from '../Services/AuthService'

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  const { at } = req.cookies
  const requestIdentity = await resolveRequestIdentity(at)
  if (!requestIdentity) {
    return res.status(401).send({ message: 'Not authorized!' })
  }
  res.locals.did = requestIdentity
  return next()
}
