import { VerifiableCredential } from '@veramo/core'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Avatar, Button, Divider, Headline } from 'react-native-paper'

import t from '../../theme'
import ClaimsInfo from '../credential/claimsInfo'
import storeCredential from '../../Veramo/storeCredential'
import { CredentialBasicInfo } from '../credential/basicInfo'

interface ICredentialTransferProps {
  credential: VerifiableCredential
  redirect: () => void
}

export const CredentialTransferView = ({ credential, redirect }: ICredentialTransferProps) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const handleSaveCredential = async () => {
    setLoading(true)
    try {
      await storeCredential(credential)
      redirect()
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  // const cancelTransferCredential = () => redirect()

  return (
    <View style={[t.bgWhite, t.flex1, t.p4, t.rounded]}>
      <View style={[t.itemsCenter, t.p4]}>
        <Avatar.Icon size={72} icon={'card-bulleted'} />
      </View>

      <Headline style={[t.mB4, t.fontSansBold, t.textCenter, t.uppercase]}>Credential Transfer request</Headline>
      <Divider />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CredentialBasicInfo credential={credential} />
        <ClaimsInfo credential={credential} />
        <Divider />
        <Button style={[t.p1, t.mT2]} mode="contained" loading={isLoading} onPress={handleSaveCredential}>
          {!isLoading && 'Save credential'}
        </Button>
      </ScrollView>
    </View>
  )
}
