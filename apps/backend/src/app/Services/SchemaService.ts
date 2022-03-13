import { ISchema } from '@ssi-ms/interfaces'
import { supabase } from '../Supabase/setup'
import { v4 as uuidv4 } from 'uuid'

const SCHEMAS_TABLE = 'ssi-schemas'

interface IUpdateSchemaArgs {
  uuid: string
  data: ISchema
}

export const getAllSchemas = async () => {
  const { data: schemas, error } = await supabase.from(SCHEMAS_TABLE).select('*')
  if (error !== null) {
    console.error(error.message)
    return []
  }
  return schemas as ISchema[]
}

export const getSchemaByUUID = async (uuid: string) => {
  const { data: schemas, error } = await supabase.from(SCHEMAS_TABLE).select('*').eq('id', uuid)

  if (error !== null || schemas.length < 1) {
    return null
  }
  return schemas[0] as ISchema
}

export const insertNewSchema = async (schema: ISchema) => {
  const newSchemaData: ISchema = { ...schema, id: uuidv4() }
  const { data: schemas, error } = await supabase.from(SCHEMAS_TABLE).upsert([newSchemaData])

  if (error !== null || schemas.length < 1) {
    console.error(!!error ? error.message : 'To many schemas')
    return null
  }

  return schemas[0] as ISchema
}

export const updateSchema = async ({ uuid, data }: IUpdateSchemaArgs) => {
  const updatedSchemaData: ISchema = { ...data, display: !!data.display }

  const { data: schemas, error } = await supabase
    .from('ssi-schemas')
    .update({ ...updatedSchemaData, updated_at: new Date() })
    .eq('id', uuid)

  if (error !== null || schemas.length < 1) {
    console.error(!!error ? error.message : 'To many schemas')
    return null
  }

  return schemas[0] as ISchema
}

export const removeSchema = async (uuid: string) => {
  const { error } = await supabase.from(SCHEMAS_TABLE).delete().eq('id', uuid)

  if (error !== null) {
    console.error(error.message)
  }
}
