import { supabase } from '../Supabase/setup'
import { v4 as uuidv4 } from 'uuid'
import { IVerificationPolicy, IVerificationPolicyDTO } from '@ssi-ms/interfaces'

const VERIFICATON_POLICY_TABLE = 'ssi-verification-policies'

export const createVerificationPolicy = async (policy: IVerificationPolicyDTO) => {
  const newPolicy = createEntityFromDTO(policy)
  const { data: policies, error } = await supabase.from(VERIFICATON_POLICY_TABLE).upsert([newPolicy])
  if (error !== null) {
    console.error(error.message)
    return null
  }

  return policies[0] as IVerificationPolicy
}

export const getAllVerificationPolicies = async () => {
  const { data: policies, error } = await supabase.from(VERIFICATON_POLICY_TABLE).select('*')
  if (error !== null) {
    return []
  }

  return policies as IVerificationPolicy[]
}

export const getVerificationPolicyByUUID = async (uuid: string) => {
  const { data: policies, error } = await supabase.from(VERIFICATON_POLICY_TABLE).select('*').eq('id', uuid)

  if (error !== null || policies.length < 1) {
    return null
  }

  return policies[0] as IVerificationPolicy
}

export const updateVerificationPolicy = async (policy: IVerificationPolicyDTO) => {
  const updatedPolicy = createEntityFromDTO(policy)
  const { data: policies, error } = await supabase
    .from(VERIFICATON_POLICY_TABLE)
    .update([{ ...updatedPolicy, updated_at: new Date() }])
    .eq('id', updatedPolicy.id)

  if (error !== null) {
    return null
  }

  return policies[0] as IVerificationPolicy
}

export const removeVerificationPolicy = async (uuid: string) => {
  const { error } = await supabase.from(VERIFICATON_POLICY_TABLE).delete().eq('id', uuid)

  if (error !== null) {
    console.error(error.message)
  }
}

const createEntityFromDTO = (dto: IVerificationPolicyDTO) => {
  const entity: IVerificationPolicy = {
    id: dto.id ?? uuidv4(),
    issuer: dto.issuer,
    schema: dto.schema,
    fields: { data: dto.claims },
  }

  return entity
}
