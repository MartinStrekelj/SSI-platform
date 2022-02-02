import { Response } from 'express'
import { signJWTToken } from './JWTService'
const THREE_HOURS = 3 * 60 * 60 * 1000

/**
 * @param did
 * @param res
 * @returns accessToken
 */
export const setAccessCookie = (did: string, res: Response) => {
  const accessToken = signJWTToken(did)
  res.cookie('at', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: THREE_HOURS,
  })
  return accessToken
}
