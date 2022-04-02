import React from 'react'
import { Card, Paragraph } from 'react-native-paper'

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
    style={[
      t.mY4,
      t.p5,
      t.rounded,
      t.bgPrimaryDark,
      t.shadow2xl,
      !!props.marked ? t.border2 : t.border0,
      t.borderPrimaryLight,
    ]}
  >
    <Card.Title title={props.title} />
    <Card.Content>
      <Paragraph>{props.content}</Paragraph>
    </Card.Content>
  </Card>
)
