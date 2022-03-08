import { SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import getLocalCredentials from '../shared/Veramo/getLocalCredentials'
import { ListCredentials } from '../shared/components/credential/list'

import t from '../shared/theme'
import { ActivityIndicator, AnimatedFAB, Colors, Headline, Button, Subheading, Switch } from 'react-native-paper'
import { RootStackParamList, Screens } from '../types'
import { FloatingMenu } from '../shared/components/FloatingMenu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native'

const MIN_NUMBER_FOR_PRESENTATION = 1

type ICredentialsScreenProps = NativeStackScreenProps<RootStackParamList, Screens.CREDENTIALS>

const CredentialsScreen = ({ navigation }: ICredentialsScreenProps) => {
  const [myCredentials, setCredentials] = useState<undefined | UniqueVerifiableCredential[]>(undefined)
  const [selectedForMerge, setForMerge] = useState<undefined | UniqueVerifiableCredential[]>([])
  const isFocused = useIsFocused()

  const [isLoading, setLoading] = useState<boolean>(true)
  const [isCreatePresentationOn, setIsSwitchOn] = useState<boolean>(false)

  const onCancelMergePress = () => {
    setIsSwitchOn(false)
    setForMerge([])
  }

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

  const handleMenuScannerPress = () => navigation.push(Screens.SCANNER)

  const handleMenuWalletPress = () => navigation.push(Screens.WALLET)

  const handleMenuMergePress = () => {
    setIsSwitchOn(true)
  }

  if (isLoading) {
    return <ActivityIndicator color={Colors.blue400} />
  }

  return (
    <SafeAreaView style={[t.pX4, t.pT2, t.hFull]}>
      <Headline style={[t.text5xl, t.pY4, t.textPrimary]}>
        {isCreatePresentationOn ? 'Create presentation' : 'My credentials'}
      </Headline>
      {isCreatePresentationOn && (
        <View>
          <Subheading style={[t.textBlack]}>
            Select which credentials you want to merge into single presentation
          </Subheading>
          <Button onPress={onCancelMergePress} style={[t.p2]} icon={'cancel'}>
            Cancel merge
          </Button>
        </View>
      )}
      <ListCredentials
        credentials={myCredentials}
        marked={selectedForMerge.map((vc) => vc.hash)}
        withSearchBar
        onCredentialClick={isCreatePresentationOn ? handleMarkForMerge : goToCredentialDetailPage}
      />
      <AnimatedFAB
        extended
        visible={isCreatePresentationOn}
        icon={'plus'}
        label="merge"
        disabled={selectedForMerge.length < MIN_NUMBER_FOR_PRESENTATION}
        style={[t.absolute, t.bottom2, t.right2]}
        onPress={() => navigation.navigate(Screens.PRESENTATION, { data: selectedForMerge })}
      />
      <FloatingMenu
        onOpenScannerClick={handleMenuScannerPress}
        onWalletInformationClick={handleMenuWalletPress}
        onCreateVPClick={handleMenuMergePress}
        visible={isFocused && !isCreatePresentationOn}
      />
    </SafeAreaView>
  )
}

export default CredentialsScreen
