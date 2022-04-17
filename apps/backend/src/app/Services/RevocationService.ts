import { IVerifiableCredentialRevocation, IVerifiableCredentialRevocationDTO } from '@ssi-ms/interfaces'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { supabase } from '../Supabase/setup'

const REVOCATIONS_TABLE = 'ssi-revoked-vc'

export const insertRevokeVerifiableCredential = async (dto: IVerifiableCredentialRevocationDTO) => {
  const { data: revocations, error } = await supabase.from(REVOCATIONS_TABLE).upsert([dto])

  if (error !== null) {
    console.error(error.message)
    return null
  }

  return revocations[0] as IVerifiableCredentialRevocation
}

export const findRevocation = async (credentialHash: string) => {
  const { data: revokedVC, error } = await supabase.from(REVOCATIONS_TABLE).select('*').eq('credential', credentialHash)

  if (error !== null) {
    return null
  }

  return revokedVC[0] as IVerifiableCredentialRevocation
}

export const isCredentialRevoked = async (credentialHash: string) => {
  const { data: revokedVCs, error } = await supabase
    .from(REVOCATIONS_TABLE)
    .select('*')
    .eq('credential', credentialHash)

  if (error !== null) {
    return true
  }

  return revokedVCs.length >= 1
}

export const undoRevocationForVC = async (credentialHash: string) => {
  await supabase.from(REVOCATIONS_TABLE).delete().eq('credential', credentialHash)
}

/**
 * from list of credentials return the unrevoked ones
 */
export const filterRevokedCredentials = async (credentials: UniqueVerifiableCredential[]) => {
  const { data, error } = await supabase.from(REVOCATIONS_TABLE).select('credential')
  if (error !== null || !data.length) {
    return credentials
  }

  const revokedVCs = data.map((datum) => datum.credential)

  return credentials.filter((credential) => !revokedVCs.includes(credential.hash))
}
