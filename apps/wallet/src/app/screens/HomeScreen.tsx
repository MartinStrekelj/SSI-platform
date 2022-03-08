import React, { useState, useEffect } from 'react'

import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { Button } from '../shared/components/Button'

// Import agent from setup
import { agent } from '../shared/Veramo/setup'

import t from '../shared/theme'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Identifier {
  did: string
}

type IHomeScreenProps = NativeStackScreenProps<RootStackParamList, Screens.WALLET>

const HomeScreen = ({navigation }: IHomeScreenProps) => {
  const [identifiers, setIdentifiers] = useState<Identifier[]>([])

  useEffect(() => {
    const onAppInit = async () => {
      try {
        const holder = await agent.didManagerCreate({ alias: 'holder' })
        setIdentifiers((s) => s.concat([holder]))
      } catch (e) {
        // Ignore error, since this means that we already have an DID for this phone
      }
      const _ids = await agent.didManagerFind()
      console.log(_ids)
      setIdentifiers(_ids)
    }

    onAppInit()
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
        <Button onPress={() => navigation.navigate(Screens.CREDENTIALS)} label="credentials" />
        <Button onPress={() => navigation.navigate(Screens.SCANNER)} label="scan" />
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
