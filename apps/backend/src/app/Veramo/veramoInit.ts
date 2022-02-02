import { agent } from './setup'

export const ISSUERS = process.env.NX_ISSUERS.split(',')

export const prepareVCIssuers = async () => {
  ISSUERS.forEach((issuer) => createAuthorityDID(issuer))
  const identifiers = await agent.didManagerFind()
  console.log(identifiers)
}

const createAuthorityDID = async (alias: string) => {
  const identifier = await agent.didManagerFind({ alias })
  const aliasExists = identifier.length > 0
  if (!aliasExists) {
    await agent.didManagerCreate({ alias })
  }
}
