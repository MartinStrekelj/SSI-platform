import { FormControl, FormHelperText, FormLabel, Input, Switch } from '@chakra-ui/react'
import { IIdentity, ISchema, ISchemaField } from '@ssi-ms/interfaces'
import { useFormik } from 'formik'
import React from 'react'
import { FormActions } from '../modules/FormActions'
import FormBody from '../modules/FormBody'
import { SchemaFields } from '../modules/schema-fields'

interface INewSchemaFormProps {
  authority: IIdentity
  isSubmitting: boolean
  handleFormSubmit: (schema: ISchema) => void
}

export const NewSchemaForm = ({ authority, isSubmitting, handleFormSubmit }: INewSchemaFormProps) => {
  const formik = useFormik({
    initialValues: {
      author: authority.metadata.alias,
      title: '',
      display: true,
      fields: [],
    },
    onSubmit: (values) => {
      if (!formik.dirty) {
        return
      }
      const newSchema: ISchema = {
        ...values,
        author: authority.did,
        fields: { data: values.fields as ISchemaField[] },
      }
      return handleFormSubmit(newSchema)
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormBody>
        <FormControl isDisabled isRequired>
          <FormLabel htmlFor="author">Schema author</FormLabel>
          <Input id="author" type="text" onChange={formik.handleChange} value={formik.values.author} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="title">Schema title</FormLabel>
          <Input id="title" type="text" onChange={formik.handleChange} value={formik.values.title} />
          <FormHelperText>
            Please insert a recognisable name for the schema eg. "Shema opravljena matura"
          </FormHelperText>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <Switch
            onChange={formik.handleChange}
            id="display"
            size={'lg'}
            name="display"
            isChecked={formik.values.display}
            aria-label="should-display-schema"
          />
          <FormLabel htmlFor="display" mb="0" ml={4}>
            Display schema
          </FormLabel>
        </FormControl>
        <FormControl isRequired={!formik.values.fields.length}>
          <FormLabel htmlFor="fields">Schema fields</FormLabel>
          <SchemaFields
            fields={formik.values.fields}
            addField={(field: ISchemaField) =>
              formik.setFieldValue('fields', [...formik.values.fields, { ...field, id: formik.values.fields.length }])
            }
            removeField={(idx: number) =>
              formik.setFieldValue(
                'fields',
                formik.values.fields.filter((s) => s.id !== idx)
              )
            }
          />
        </FormControl>
        <FormActions handleReset={formik.handleReset} isSubmitting={isSubmitting} submitLabel="Create schema" />
      </FormBody>
    </form>
  )
}
