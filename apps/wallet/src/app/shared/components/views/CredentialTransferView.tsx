import { VerifiableCredential } from '@veramo/core'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Divider, Headline } from 'react-native-paper'

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
      setLoading(false)
      redirect()
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  // const cancelTransferCredential = () => redirect()

  return (
    <View>
      <Headline style={[t.mB4, t.fontSansBold]}>Credential Transfer request</Headline>
      <Divider />
      <ScrollView>
        <CredentialBasicInfo credential={credential} />
        <ClaimsInfo credential={credential} />
        <Divider />
        <Button mode="contained" loading={isLoading} onPress={handleSaveCredential}>
          {!isLoading && 'Save credential'}
        </Button>
      </ScrollView>
    </View>
  )
}
