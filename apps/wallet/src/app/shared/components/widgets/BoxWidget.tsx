import { View } from 'react-native'
import React, { useCallback } from 'react'
import { DataTable, Title } from 'react-native-paper'

import t from '../../theme'

interface IBoxWidgetProps {
  title?: string
  head?: string[]
  body: any[][]
}

export const BoxWidget = ({ head, title, body }: IBoxWidgetProps) => {
  const renderHead = useCallback((value, i) => <DataTable.Title key={i}>{value}</DataTable.Title>, [head])
  const renderBody = useCallback(
    (body) =>
      body.map((values, i: number) => (
        <DataTable.Row key={`row-${i}`}>
          {values.map((value, j: number) => (
            <DataTable.Cell key={`cell-${j}-${i}`}>{JSON.stringify(value)}</DataTable.Cell>
          ))}
        </DataTable.Row>
      )),
    [body]
  )
  return (
    <View style={[t.shadow2xl, t.mY2]}>
      <Title>{!!title && title}</Title>
      <DataTable style={[t.bgWhite]}>
        {!!head && <DataTable.Header>{head.map(renderHead)}</DataTable.Header>}
        {renderBody(body)}
      </DataTable>
    </View>
  )
}
