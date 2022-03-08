import { agent } from './setup'

export const checkIfAuthorityDid = async (did: string) => {
  const AuthorityDIDs = await agent.didManagerFind()
  if (AuthorityDIDs.length === 0) {
    return false
  }
  const searchAuthorityDID = AuthorityDIDs.find((authority) => authority.did === did)

  return searchAuthorityDID || false
}

export const getAuthority = async (alias: string) => await agent.didManagerGetByAlias({ alias })
