import { CLAIM_TYPES, ISchemaField } from '@ssi-ms/interfaces'
import {
  getAllSchemas,
  getSchemaByUUID,
  insertNewSchema,
  removeSchema,
  updateSchema,
} from '../app/Services/SchemaService'

const testSchemaUUID = '330af147-9fbb-41e4-b721-0623133079a7'

describe('Schema service tests', () => {
  it('Schema tests ~ Fetch all schemas', async () => {
    const schemas = await getAllSchemas()
    expect(schemas.length).toBeGreaterThan(0)
  })

  it('Schema tests ~ Fetch schema by uuid', async () => {
    const schema = await getSchemaByUUID(testSchemaUUID)
    const schema2 = await getSchemaByUUID(testSchemaUUID.replace('1', '2'))
    expect(schema.title.includes('Schema tests')).toBeTruthy()
    expect(schema2).toBeNull()
  })

  it('Schema tests ~ Insert new schema', async () => {
    const dummyClaims: ISchemaField[] = [
      { title: 'dummy', type: CLAIM_TYPES.NUMERIC },
      { title: 'dummy2', type: CLAIM_TYPES.NUMERIC },
    ]
    const newSchema = await insertNewSchema({
      author: 'test',
      title: 'Schema tests',
      fields: { data: dummyClaims },
      display: true,
    })
    expect(newSchema.title).toBe('Schema tests')
    expect(newSchema.fields.data.length).toEqual(2)
    expect(newSchema.fields.data[0].title).toEqual('dummy')
    expect(newSchema.fields.data[1].title).toEqual('dummy2')
  })

  it('Schema tests ~ Update schema', async () => {
    const fields: ISchemaField[] = [{ title: 'updatedClaims', type: CLAIM_TYPES.NUMERIC }]

    const updatedSchema = await updateSchema({
      uuid: testSchemaUUID,
      data: { title: 'Schema tests ~ 2', author: 'test', fields: { data: fields } },
    })

    expect(updatedSchema.title).toBe('Schema tests ~ 2')
    expect(updatedSchema.fields.data.length).toEqual(1)
    expect(updatedSchema.fields.data[0].title).toEqual('updatedClaims')
    expect(updatedSchema.display).toBeFalsy()
  })

  it('Schema tests ~ Remove schemas', async () => {
    const schemas = await getAllSchemas()
    const schemaIds = schemas
      .filter((s) => s.id !== testSchemaUUID && s.title.includes('Schema tests'))
      .map((s) => s.id)
    expect(schemas.length).toBeGreaterThan(schemaIds.length)
    for (let i = 0; i < schemaIds.length; i++) {
      const schemaUUID = schemaIds[i]
      await removeSchema(schemaUUID)
    }

    const schemasAfterRemove = await getAllSchemas()
    expect(schemasAfterRemove.length).toBeLessThan(schemas.length)
    expect(schemasAfterRemove.some((s) => s.id === testSchemaUUID)).toBeTruthy()
  })
})
