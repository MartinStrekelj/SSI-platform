import { SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import getLocalCredentials from '../shared/Veramo/getLocalCredentials'
import { ListCredentials } from '../shared/components/credential/list'

import t from '../shared/theme'
import { ActivityIndicator, AnimatedFAB, Colors, Headline, Subheading, Switch } from 'react-native-paper'
import { Screens } from '../types'

const MIN_NUMBER_FOR_PRESENTATION = 1

const CredentialsScreen = ({ navigation }) => {
  const [myCredentials, setCredentials] = useState<undefined | UniqueVerifiableCredential[]>(undefined)
  const [selectedForMerge, setForMerge] = useState<undefined | UniqueVerifiableCredential[]>([])

  const [isLoading, setLoading] = useState<boolean>(true)
  const [isCreatePresentationOn, setIsSwitchOn] = useState<boolean>(false)

  const onToggleSwitch = () => setIsSwitchOn(!isCreatePresentationOn)

  const goToCredentialDetailPage = (credential: UniqueVerifiableCredential) => {
    console.log('TODO')
  }

  const handleMarkForMerge = (newCredential: UniqueVerifiableCredential) => {
    // Remove marked
    if (selectedForMerge.includes(newCredential)) {
      setForMerge(selectedForMerge.filter((credential) => credential.hash !== newCredential.hash))
      return
    }

    // Add new
    setForMerge([...selectedForMerge, newCredential])
  }

  useEffect(() => {
    const fetchLocalCredentials = async () => {
      const credentials = await getLocalCredentials()
      setCredentials(credentials)
      setLoading(false)
    }
    fetchLocalCredentials()
  }, [])

  if (isLoading) {
    return <ActivityIndicator color={Colors.blue400} />
  }

  return (
    <SafeAreaView style={[t.pX4, t.pT2, t.hFull]}>
      <Headline style={[t.text5xl, t.pT4, t.textPrimary]}>My credentials</Headline>
      <View style={[t.flex, t.flexRow, t.itemsCenter]}>
        <Subheading style={[t.textBlack]}>Merge into presentation</Subheading>
        <Switch style={[t.pY4, t.pX2]} value={isCreatePresentationOn} onValueChange={onToggleSwitch} />
      </View>
      <ListCredentials
        credentials={myCredentials}
        marked={selectedForMerge.map((vc) => vc.hash)}
        withSearchBar
        onCredentialClick={isCreatePresentationOn ? handleMarkForMerge : goToCredentialDetailPage}
      />
      <AnimatedFAB
        extended
        icon={'plus'}
        label="merge"
        disabled={selectedForMerge.length < MIN_NUMBER_FOR_PRESENTATION}
        style={[t.absolute, t.bottom2, t.right2]}
        onPress={() => navigation.navigate(Screens.PRESENTATION, { data: selectedForMerge })}
      />
    </SafeAreaView>
  )
}

export default CredentialsScreen
