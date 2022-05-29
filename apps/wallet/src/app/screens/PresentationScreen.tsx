import { SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import t from '../shared/theme'

import { AnimatedFAB, Divider, FAB, Subheading, Button, TextInput } from 'react-native-paper'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SelectClaims } from '../shared/components/claims/select'
import { ErrorComponent } from '../shared/components/Error'
import PresentationCreateContextProvider, { usePresentationContext } from '../shared/lib/PresentationCreateContext'
import { StatusBar } from '../shared/components/statusbar'

const MIN_NUMBER_OF_CLAIMS = 1

type IPresentationScreenProps = NativeStackScreenProps<RootStackParamList, Screens.PRESENTATION>

/**
 * Prepare a presentation from selected credentials & presentations
 */
const PresentationScreen = ({ navigation, route }: IPresentationScreenProps) => {
  const renderCredentialClaimsSelect = useCallback(
    (credential: UniqueVerifiableCredential) => <SelectClaims key={credential.hash} credential={credential} />,
    [route.params]
  )

  useEffect(() => {
    if (!route.params) {
      navigation.navigate(Screens.WALLET)
      return
    }
  }, [route.params])

  if (!route.params) {
    return <ErrorComponent />
  }

  const { data } = route.params

  return (
    <>
      <StatusBar onBackClick={navigation.goBack} title="Create new presentation" />
      <SafeAreaView style={[t.pX4, t.pT2, t.hFull]}>
        <PresentationCreateContextProvider>
          <Subheading style={[t.textBlack]}>Please select credential claims to costruct presentation</Subheading>
          <SubmitNewPresentationButton />
          <Divider accessible style={[t.bgGray400, t.p0_5, t.rounded, t.mY2]} />
          <ScrollView>{data.map(renderCredentialClaimsSelect)}</ScrollView>
        </PresentationCreateContextProvider>
      </SafeAreaView>
    </>
  )
}

const SubmitNewPresentationButton = () => {
  const { selectedClaims, createNewPresentation, presentationName, setName } = usePresentationContext()
  return (
    <>
      <TextInput
        label={'Name your presentation'}
        style={[t.mY2]}
        onChangeText={(text: string) => setName(text)}
        value={presentationName}
      />
      <Button
        icon={'credit-card-check'}
        disabled={selectedClaims.length < MIN_NUMBER_OF_CLAIMS && presentationName.length > 0}
        onPress={createNewPresentation}
      >
        Create new presentation
      </Button>
    </>
  )
}

export default PresentationScreen
