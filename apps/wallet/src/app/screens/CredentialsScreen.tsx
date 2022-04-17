import { SafeAreaView, StatusBar, View } from 'react-native'
import React, { useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { ListCredentials } from '../shared/components/credential/list'

import t from '../shared/theme'
import { ActivityIndicator, AnimatedFAB, Colors, Headline, Button, Subheading, Switch } from 'react-native-paper'
import { RootStackParamList, Screens } from '../types'
import { FloatingMenu } from '../shared/components/FloatingMenu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native'
import { useCredentials } from '../shared/hooks/useCredentials'

const MIN_NUMBER_FOR_PRESENTATION = 1

type ICredentialsScreenProps = NativeStackScreenProps<RootStackParamList, Screens.CREDENTIALS>

const CredentialsScreen = ({ navigation }: ICredentialsScreenProps) => {
  const [selectedForMerge, setForMerge] = useState<undefined | UniqueVerifiableCredential[]>([])
  const isFocused = useIsFocused()
  const { myCredentials, myPresentations, isLoading } = useCredentials()
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

  const handleMenuScannerPress = () => navigation.push(Screens.SCANNER)

  const handleMenuWalletPress = () => navigation.push(Screens.WALLET)

  const handleMenuMergePress = () => setIsSwitchOn(true)

  if (isLoading) {
    return <ActivityIndicator color={Colors.blue400} />
  }

  return (
    <SafeAreaView style={[t.pX4, t.pT4, t.hFull, t.flex1]}>
      <StatusBar backgroundColor={t.textPrimary.color} />
      <Headline style={[t.fontSansBoldItalic, t.text5xl, t.p4, t.textWhite, t.textCenter]}>SSI Wallet</Headline>
      {isCreatePresentationOn && (
        <View style={(t.pX4, t.pT2, t.pB4)}>
          <Subheading style={[t.textWhite, t.fontSans]}>
            Select which credentials you want to merge into single presentation
          </Subheading>
          <Button mode="text" onPress={onCancelMergePress} style={[t.p2, t.bgWhite, t.m2]} icon={'cancel'}>
            Cancel merge
          </Button>
        </View>
      )}
      <ListCredentials
        credentials={myCredentials}
        presentations={myPresentations}
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
      <View style={[t.absolute, t.flex1, t.top0, t.bottom0, t.left0, t.right0, t.negativeZ]}>
        <View style={[t.h72, t.bgPrimary]} />
        <View style={[t.flex1, t.bgWhite]} />
      </View>
    </SafeAreaView>
  )
}

export default CredentialsScreen
