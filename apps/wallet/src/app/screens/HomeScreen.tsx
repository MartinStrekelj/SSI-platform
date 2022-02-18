import { LZW_decode } from '@ssi-ms/utils'
import React, { useState, useEffect } from 'react'

import { SafeAreaView, Text, StatusBar, View, ScrollView } from 'react-native'
import { Screens } from '../App'
import { Button } from '../components/Button'
import { LoginAttemptModal } from '../components/modals/LoginAttemptModal'

// Import agent from setup
import { agent } from '../shared/Veramo/setup'

import t from '../shared/theme'
import { handleScanMessage } from '../shared/lib/CredentialService'

interface Identifier {
  did: string
}

const HomeScreen = ({ route, navigation }: any) => {
  if (route.params) {
    handleScanMessage(route.params.message)
  }

  const [receivedMessage, setMessage] = useState<any | null>(null)
  const [identifiers, setIdentifiers] = useState<Identifier[]>([])

  const createIdentifier = async () => {
    console.log('Creating a holder')
    const holder = await agent.didManagerCreate({ alias: 'holder' })
    console.log(`Holder with alias: ${holder.alias} | DID: ${holder.did} | created`)
    console.log('Creating a key agreement key!')

    setIdentifiers((s) => s.concat([holder]))
  }

  const deleteIdentifiers = async () => {
    console.warn('presesd delete indentifiers')
    identifiers.map((identifier) => {
      agent.didManagerDelete({ did: identifier.did })
    })
  }

  useEffect(() => {
    const getIdentifiers = async () => {
      const _ids = await agent.didManagerFind()
      console.log(_ids)
      setIdentifiers(_ids)
    }

    getIdentifiers()
  }, [])

  return (
    <>
      <SafeAreaView style={[t.pX4]}>
        <Text style={[t.text5xl, t.textPrimary, t.pY5, t.fontSansBold, t.textCenter]}>SSI-Mobile wallet</Text>
        <View style={[t.pX4, t.flex, t.flexRow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.textXl, t.fontMonoBold, t.pR1]}>DID:</Text>

          <ScrollView>
            {identifiers.map((ident) => (
              <Text key={ident.did} style={[t.textLg]}>
                {ident.did}
              </Text>
            ))}
          </ScrollView>
        </View>
        <Button onPress={createIdentifier} label="create" />
        <Button onPress={deleteIdentifiers} label="delete" />
        <Button onPress={() => navigation.navigate(Screens.CREDENTIALS)} label="credentials" />
        <Button onPress={() => navigation.navigate(Screens.SCANNER)} label="scan" />
        <LoginAttemptModal open={receivedMessage} loginAttemptMessage={'foo'} />
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
