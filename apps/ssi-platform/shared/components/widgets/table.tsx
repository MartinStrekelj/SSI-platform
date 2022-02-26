import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Heading, Box } from '@chakra-ui/react'

interface ITableWidgetProps {
  title?: string
  head?: string[]
  body: any[][]
}

// Explore react table package to handle this widget

export const TableWidget = ({ head, body, title, ...styleProps }: ITableWidgetProps) => {
  return (
    <Box>
      {!!title && <Heading my={2}>{title}</Heading>}
      <Table variant="simple" {...styleProps}>
        {head && !!head.length && (
          <Thead>
            <Tr>
              {head.map((h) => (
                <Th fontWeight={'bold'} fontSize={['sm', 'md', 'lg']} key={h}>
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>
        )}
        <Tbody>
          {!!body.length &&
            body.map((values: any[], j) => (
              <Tr key={j}>
                {values.map((value, i) => (
                  <Td key={JSON.stringify(`${i}`)}>{!!value ? value : 'N/A'}</Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  )
}
