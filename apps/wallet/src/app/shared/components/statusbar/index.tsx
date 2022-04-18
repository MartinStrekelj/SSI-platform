import { View, Text, Pressable } from 'react-native'
import React from 'react'

import t from '../../theme'
import { Avatar, Colors } from 'react-native-paper'

interface IStatusBarProps {
  onBackClick: () => void
  title?: string
}

export const StatusBar = ({ onBackClick, title = 'SSI Wallet' }: IStatusBarProps) => {
  return (
    <View style={[t.wFull, t.flexRow, t.justifyBetween, t.pY4, t.pX6, t.itemsCenter]}>
      <Pressable onPress={onBackClick}>
        <Avatar.Icon size={36} icon="arrow-left" style={[t.bgGray100]} color={Colors.blueA400} />
      </Pressable>
      <Text style={[t.textXl, t.textPrimary, t.fontSansBold, t.flex1, t.mL4]}>{title}</Text>
    </View>
  )
}
