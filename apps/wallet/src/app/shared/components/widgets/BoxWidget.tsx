import { View } from 'react-native'
import React, { useCallback } from 'react'
import { DataTable, Text, Title } from 'react-native-paper'

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
            <View style={[t.flex1, t.justifyCenter, t.itemsStart, t.p2]} key={`cell-${j}-${i}`}>
              <Text style={[t.fontSans, t.textLeft]}>{displayValue(value).trim()}</Text>
            </View>
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

const displayValue = (value: any) => {
  if (!value && typeof value !== 'number') {
    return 'N/A'
  }

  if (typeof value !== 'string') {
    return JSON.stringify(value)
  }

  return value
}
