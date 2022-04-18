import React from 'react'
import { Card, Paragraph } from 'react-native-paper'

import t from '../../theme'

const imageURL =
  'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

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
        uri: imageURL,
      }}
    />
    <Card.Title title={props.title} titleStyle={[t.fontSansBold]} />
    <Card.Content>
      <Paragraph>{props.content}</Paragraph>
    </Card.Content>
  </Card>
)
