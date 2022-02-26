import { SafeAreaView } from 'react-native'
import React, { useState } from 'react'

import t from '../shared/theme'

import { AnimatedFAB, Button, Divider, Headline, Modal, Portal, Subheading, Text } from 'react-native-paper'
import { ListCredentials } from '../components/credential/list'
import { Screens } from '../App'
import { IClaim } from '@ssi-ms/interfaces'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import SelectClaimsModal from '../components/modals/SelectClaimsModal'

const MIN_NUMBER_OF_CLAIMS = 1

/**
 * Prepare a presentation from selected credentials & presentations
 */
const PresentationScreen = ({ navigation, route }: any) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [presentationClaims, setClaim] = useState<IClaim[]>([])
  const [selected, setSelected] = useState<IClaim[] | null>(null)

  if (!route.params) {
    return navigation.navigate(Screens.WALLET)
  }

  // Let user select which claims he wants to add to presentation
  const showModal = (vc: UniqueVerifiableCredential) => {
    const { claims: strigified } = vc.verifiableCredential.credentialSubject
    const claims = JSON.parse(strigified) as IClaim[]
    setSelected(claims)
    setVisible(true)
  }

  const hideModal = () => {
    setSelected(null)
    setVisible(false)
  }

  const { data } = route.params

  const handleAddClaimsFromVC = (claims: IClaim[]) => {
    setClaim([...presentationClaims, ...claims])
    hideModal()
  }

  return (
    <SafeAreaView style={[t.pX4, t.pT2, t.hFull]}>
      <Headline style={[t.text5xl, t.pT4, t.textPrimary]}>Create presentation</Headline>
      <Subheading style={[t.textBlack]}>Please select credential claims to costruct presentation</Subheading>
      <Divider accessible style={[t.bgGray400, t.p0_5, t.rounded, t.mY2]} />
      <Subheading style={[t.textBlack]}>{JSON.stringify(presentationClaims)}</Subheading>

      <ListCredentials credentials={data} withSearchBar={false} onCredentialClick={showModal} />
      <Portal>
        <SelectClaimsModal
          visible={visible}
          selected={selected}
          hideModal={hideModal}
          onSubmit={handleAddClaimsFromVC}
        />
      </Portal>
      <AnimatedFAB
        extended
        icon={'plus'}
        label="create presentation"
        disabled={presentationClaims.length < MIN_NUMBER_OF_CLAIMS}
        style={[t.absolute, t.bottom2, t.right2]}
        onPress={() => console.log('submit')}
      />
    </SafeAreaView>
  )
}

export default PresentationScreen