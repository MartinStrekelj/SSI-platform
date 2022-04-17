import { Response } from 'express'
import { signJWTToken } from './JWTService'
const THREE_HOURS = 3 * 60 * 60 * 1000
const COOKIE_NAME = 'at'
/**
 * @param did
 * @param res
 * @returns accessToken
 */
export const setAccessCookie = (did: string, res: Response) => {
  const accessToken = signJWTToken(did)
  res.cookie(COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: THREE_HOURS,
  })
  return accessToken
}

export const removeCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAME)
}
