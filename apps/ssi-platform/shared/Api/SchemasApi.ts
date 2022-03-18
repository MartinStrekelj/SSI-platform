import { ISchema, ISchemaResponse } from '@ssi-ms/interfaces'
import { create } from 'apisauce'
import useSWR from 'swr'

const SchemasApi = create({
  baseURL: '/api/schemas',
  withCredentials: true,
})

const schemasFetcher = (url: string) => SchemasApi.get(url).then((res) => res.data)

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

export const useSchemas = () => {
  const { data, error, isValidating } = useSWR('/', schemasFetcher)

  return {
    data: data as { schemas: ISchema[] },
    isLoading: isValidating || (!error && !data),
    isError: error,
  }
}
