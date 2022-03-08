import { resolveDID } from '../Veramo/DIDResolver'
import { resolveJWTToken } from './JWTService'

type IResolveRequestIdentity = (jwt: string) => Promise<string | false>

export const resolveRequestIdentity: IResolveRequestIdentity = async (jwt: string) => {
  try {
    const resolvedJWT = resolveJWTToken(jwt)
    if (!resolvedJWT) {
      throw Error('JWT could not be resolved!')
    }

    await resolveDID(resolvedJWT.did)

    return resolvedJWT.did
  } catch (error) {
    console.error(error.message)
    return false
  }
}
