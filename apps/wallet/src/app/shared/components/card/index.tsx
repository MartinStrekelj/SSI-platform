import React from 'react'
import { View } from 'react-native'
import { Card, Headline, Paragraph } from 'react-native-paper'

import t from '../../theme'

interface ICardComponentProps {
  marked?: boolean
  onPress?: () => void
  title: string
  content: React.ReactNode | string
}

export const CardComponent = (props: ICardComponentProps) => (
  <Card
    onPress={props.onPress}
    mode={'elevated'}
    style={[t.mY2, t.rounded, t.shadow2xl, !!props.marked ? t.border2 : t.border0_5, t.borderPrimary]}
  >
    <Card.Cover
      source={{
        uri: 'https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      }}
    />
    <Card.Title title={props.title} titleStyle={[t.fontSansBold]} />
    <Card.Content>
      <Paragraph>{props.content}</Paragraph>
    </Card.Content>
  </Card>
)
