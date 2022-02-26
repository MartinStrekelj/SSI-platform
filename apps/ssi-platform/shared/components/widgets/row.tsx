import { Flex, Tag, Text } from '@chakra-ui/react'
import React from 'react'

interface IRowWidgetProps {
  attribute: string
  value?: React.ReactElement | string
}

export const RowWidget = ({ attribute, value }: IRowWidgetProps) => {
  return (
    <Flex my={[4, 6, 8]} alignItems="center">
      <Tag size="lg" mr={2} variant="solid">
        {attribute}
      </Tag>
      {!!value && typeof value === 'string' ? <Text>{value}</Text> : value}
    </Flex>
  )
}
