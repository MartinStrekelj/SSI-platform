import { IVerifiableData } from '@ssi-ms/interfaces'
import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Divider, Headline, IconButton, Modal, Portal, Subheading, Text } from 'react-native-paper'
import { useCredentials } from '../../../hooks/useCredentials'
import { useSDRContext } from '../../../lib/SDRResponseContext'

import t from '../../../theme'
import { ListCredentials } from '../../credential/list'

interface ISdrModalProps {
  open: boolean
  toggleModal: () => void
}

const SdrModal = ({ open, toggleModal }: ISdrModalProps) => {
  const { isLoading, myCredentials, myPresentations } = useCredentials()
  const { addVerifiableData, removeVerifiableData, verifiableData, marked } = useSDRContext()

  const handleSelect = (selected: IVerifiableData) => {
    const isSelected = verifiableData.some((vd) => vd.hash === selected.hash)

    if (isSelected) {
      removeVerifiableData(selected)
    } else {
      addVerifiableData(selected)
    }

    toggleModal()
  }

  return (
    <>
      <Portal>
        <Modal visible={open} style={[t.p4, t.flex]}>
          <View style={[t.hFull, t.wFull, t.bgWhite, t.p3, t.pT12, t.rounded]}>
            <IconButton icon="close-thick" style={[t.absolute, t.top0, t.right1]} onPress={toggleModal} />
            <Subheading style={[t.textCenter]}>
              Please select a credential that you want to submit for verification {'\n \n'}
              Currently selected: <Text style={[t.fontSansBoldItalic, t.textXl]}>{marked.length}</Text>
            </Subheading>
            <Divider style={[t.mB2]} />
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <ListCredentials
                marked={marked}
                withSearchBar={false}
                credentials={myCredentials}
                presentations={myPresentations}
                onCredentialClick={handleSelect}
                onPresentationClick={handleSelect}
              />
            )}
          </View>
        </Modal>
      </Portal>
    </>
  )
}

export default SdrModal
