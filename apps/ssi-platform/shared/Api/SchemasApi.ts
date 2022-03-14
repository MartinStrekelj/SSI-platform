import { ISchema, ISchemaResponse } from '@ssi-ms/interfaces'
import { create } from 'apisauce'

const SchemasApi = create({
  baseURL: '/api/schemas',
  withCredentials: true,
})

export const createNewSchemaRequest = async (schema: ISchema) => {
  try {
    const response = await SchemasApi.post('/', schema)
    const { message } = response.data as ISchemaResponse
    if (response.status >= 400) {
      throw new Error(message)
    }

    return { ok: true, message }
  } catch (error) {
    return { ok: false, message: error.message }
  }
}
