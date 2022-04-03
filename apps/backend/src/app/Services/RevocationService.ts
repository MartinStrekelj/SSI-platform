import { IVerifiableCredentialRevocation, IVerifiableCredentialRevocationDTO } from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'
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

export const isCredentialRevoked = async (credentialHash: string) => {}

export const filterRevokedCredentials = async (credentials: VerifiableCredential[]) => {
  const { data: revokedVCs, error } = await supabase.from(REVOCATIONS_TABLE).select('credential')
  if (error !== null || !revokedVCs.length) {
    return credentials
  }

  console.log(revokedVCs)
}
