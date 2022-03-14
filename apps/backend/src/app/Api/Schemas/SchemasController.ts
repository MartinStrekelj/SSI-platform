import { isAddSchemaRequest } from '@ssi-ms/interfaces'
import { Response, Request } from 'express'
import {
  getAllSchemas,
  getSchemaByUUID,
  insertNewSchema,
  removeSchema,
  updateSchema,
} from '../../Services/SchemaService'

export const allSchemas = async (req: Request, res: Response) => {
  try {
    const schemas = await getAllSchemas()
    return res.send({ message: 'Success', schemas })
  } catch (err) {
    return res.status(400).send({ message: 'Something went wrong' })
  }
}

export const getSchema = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }
    if (!uuid) {
      throw new Error()
    }
    const schema = await getSchemaByUUID(uuid)

    if (schema === null) {
      return res.status(404).send({ message: 'Schema not found' })
    }

    return res.send({ message: 'Success', schema })
  } catch (err) {
    return res.status(400).send({ message: 'Something went wrong' })
  }
}

export const postSchema = async (req: Request, res: Response) => {
  try {
    const { body } = req
    if (!isAddSchemaRequest(body)) {
      throw new Error('Not correct request type')
    }

    const authorMatchesIdentity = res.locals.did === body.author

    if (!authorMatchesIdentity) {
      throw new Error('Author does not match identity')
    }

    const schema = await insertNewSchema(body)

    if (schema === null) {
      throw new Error('Error when creating new schema')
    }

    return res.send({ message: 'Success', schema })
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
}

export const putSchema = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }
    const { body } = req
    if (!isAddSchemaRequest(body) || !uuid) {
      throw new Error('Not correct request type')
    }
    const schema = await updateSchema({ uuid, data: body })

    if (schema === null) {
      throw new Error('Error when updating new schema')
    }

    return res.send({ message: 'Success', schema })
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
}

export const deleteSchema = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params as { uuid: string }
    if (!uuid) {
      throw new Error()
    }
    await removeSchema(uuid)
    return res.send({ message: 'Success' })
  } catch (err) {
    return res.status(400).send({ message: 'Something went wrong' })
  }
}
