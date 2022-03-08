import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../../components/Button'

import t from '../../../theme'

interface LoginAttemptModalProps {
  open: boolean
  loginAttemptMessage: any
}

export const LoginAttemptModal = ({ open, loginAttemptMessage }: LoginAttemptModalProps) => {
  if (!open) {
    return null
  }

  return (
    <View style={[t.p4, t.roundedSm, t.border0_5]}>
      <Text testID="heading" style={[t.fontSansBold, t.textLg, t.pB2]}>
        Pending login attempt:
      </Text>
      {/* Todo based on message */}
      {/* <Text>Additional information</Text> */}
      {/* <Text>Issued: "when message was send"</Text> */}
      <View style={[t.flex, t.flexRow, t.justifyEvenly]}>
        <Button styles={[t.bgSecondary]} label="decline" />
        <Button label="accept" />
      </View>
    </View>
  )
}
