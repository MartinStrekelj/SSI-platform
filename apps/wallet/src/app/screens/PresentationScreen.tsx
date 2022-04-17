import { SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import t from '../shared/theme'

import { AnimatedFAB, Divider, Headline, Subheading } from 'react-native-paper'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SelectClaims } from '../shared/components/claims/select'
import { ErrorComponent } from '../shared/components/Error'
import PresentationCreateContextProvider, { usePresentationContext } from '../shared/lib/PresentationCreateContext'

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
    <SafeAreaView style={[t.pX4, t.pT2, t.hFull]}>
      <PresentationCreateContextProvider>
        <Subheading style={[t.textBlack]}>Please select credential claims to costruct presentation</Subheading>
        <Divider accessible style={[t.bgGray400, t.p0_5, t.rounded, t.mY2]} />
        <ScrollView>{data.map(renderCredentialClaimsSelect)}</ScrollView>
        <SubmitNewPresentationButton />
      </PresentationCreateContextProvider>
    </SafeAreaView>
  )
}

const SubmitNewPresentationButton = () => {
  const { selectedClaims, createNewPresentation } = usePresentationContext()
  return (
    <AnimatedFAB
      extended
      icon={'credit-card-check'}
      label="Create"
      disabled={selectedClaims.length < MIN_NUMBER_OF_CLAIMS}
      style={[t.absolute, t.bottom2, t.right2]}
      onPress={createNewPresentation}
    />
  )
}

export default PresentationScreen
