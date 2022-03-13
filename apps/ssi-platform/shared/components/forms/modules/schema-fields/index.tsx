import { Box, Button, Flex, Icon, IconButton, Input, Select } from '@chakra-ui/react'
import { CLAIM_TYPES, ISchemaField } from '@ssi-ms/interfaces'
import React, { useCallback, useState } from 'react'
import { X } from 'react-feather'
import { TableWidget } from '../../../widgets/table'

interface ISchemaFieldsProps {
  fields: ISchemaField[]
  addField: (sf: ISchemaField) => void
  removeField: (idx: number) => void
}

interface IAddNewFieldProps {
  addField: (sf: ISchemaField) => void
}

export const SchemaFields = ({ fields, addField, removeField }: ISchemaFieldsProps) => {
  const renderTableRow = useCallback(
    (sf: ISchemaField, i: number) => {
      return [
        sf.title,
        sf.type,
        <IconButton aria-label="remove-field" onClick={() => removeField(i)} icon={<Icon as={X} />} />,
      ]
    },
    [fields]
  )

  return (
    <Box w={'100%'}>
      {!!fields.length && <TableWidget head={['Title', 'Type', '']} body={fields.map(renderTableRow)} />}
      <AddNewField addField={addField} />
    </Box>
  )
}

const AddNewField = ({ addField }: IAddNewFieldProps) => {
  const [title, setTitle] = useState<string>('')
  const [type, setType] = useState<CLAIM_TYPES>(CLAIM_TYPES.CHECKBOX)
  const [isError, setError] = useState<boolean>(false)

  const handleAdd = () => {
    if (title.length < 1) {
      setError(true)
      return
    }
    setError(false)
    addField({ title, type })
    setTitle('')
    setType(CLAIM_TYPES.CHECKBOX)
  }

  return (
    <Box mt={4}>
      <Flex alignItems={'center'} gap={4}>
        <Input
          onFocus={() => setError(false)}
          isInvalid={isError}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Select onChange={(e) => setType(e.target.value as CLAIM_TYPES)}>
          {Object.values(CLAIM_TYPES).map((claim: string) => (
            <option key={claim} value={claim}>
              {claim}
            </option>
          ))}
        </Select>
      </Flex>
      <Button w={'100%'} my={4} onClick={handleAdd}>
        Add
      </Button>
    </Box>
  )
}
