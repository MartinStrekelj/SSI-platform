import React, { useState, useEffect } from 'react'

import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import { Button } from '../shared/components/Button'

// Import agent from setup
import { agent } from '../shared/Veramo/setup'

import t from '../shared/theme'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from '../shared/components/statusbar'
import { ActivityIndicator, Avatar, Colors, Headline, Subheading } from 'react-native-paper'
import { useCredentials } from '../shared/hooks/useCredentials'
import { BoxWidget } from '../shared/components/widgets/BoxWidget'

interface Identifier {
  did: string
}

type IHomeScreenProps = NativeStackScreenProps<RootStackParamList, Screens.WALLET>

const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  const [identity, setIdentity] = useState<Identifier | null>(null)
  const { myCredentials, myPresentations } = useCredentials()

  useEffect(() => {
    const onAppInit = async () => {
      try {
        await agent.didManagerCreate({ alias: 'holder' })
      } catch (e) {
        // Ignore error, since this means that we already have an DID for this phone
      } finally {
        const _ids = await agent.didManagerFind()
        console.log({ holder: _ids[0].did })
        setIdentity(_ids[0])
      }
    }

    onAppInit()
  }, [])

  if (identity === null) {
    return <ActivityIndicator color={Colors.blue500} />
  }

  const info = {
    title: 'Holder info:',
    body: [['DID', identity.did]],
  }

  const stats = {
    title: 'Holder stats:',
    body: [
      ['Credentials', myCredentials.length],
      ['Presentations', myPresentations.length],
    ],
  }

  return (
    <>
      <StatusBar onBackClick={navigation.goBack} title={'My wallet information'} />
      <ScrollView style={[t.pX4, t.flex1]}>
        <View style={[t.wFull, t.justifyCenter, t.itemsCenter, t.flex1]}>
          <Avatar.Icon size={72} icon="shield-account-outline" />
          <Headline style={[t.textCenter, t.fontSans]}>{'SSI HOLDER \n ACCOUNT'}</Headline>
        </View>
        <Subheading style={[t.textCenter, t.fontSans]}>
          DID is your public address that is used to identify you in the SSI process
        </Subheading>

        <View style={[t.pX2]}>
          <BoxWidget body={info.body} />
        </View>

        <View style={[t.pX4, t.flex1]}>
          <BoxWidget title={stats.title} body={stats.body} />
        </View>
      </ScrollView>
    </>
  )
}

export default HomeScreen
