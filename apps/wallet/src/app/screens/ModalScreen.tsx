import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from '../types'
import { handleScanMessage, IScanMessagePayload } from '../shared/lib/CredentialService'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { ErrorComponent } from '../shared/components/Error'
import { ISingleDisclosureDTO, MESSAGE_TYPE } from '@ssi-ms/interfaces'
import { CredentialTransferView } from '../shared/components/views/CredentialTransferView'
import { VerifiableCredential } from '@veramo/core'

import t from '../shared/theme'
import SDRequestView from '../shared/components/views/SDRequestView'
import { SDRResponseContextProvider } from '../shared/lib/SDRResponseContext'

type IModalScreenProps = NativeStackScreenProps<RootStackParamList, Screens.MODAL>

const ModalScreen = ({ navigation, route }: IModalScreenProps) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IScanMessagePayload | undefined>(undefined)

  useEffect(() => {
    const onInit = async () => {
      try {
        const result = await handleScanMessage(route.params.message)
        setData(result)
      } catch (e) {
        console.error(e.message)
        // Do nothing
      } finally {
        setLoading(false)
      }
    }

    if (!route.params) {
      return
    }
    onInit()
  }, [route.params])

  const renderModalContent = useCallback(() => {
    switch (data.type) {
      case MESSAGE_TYPE.LOGIN_2FA:
        return (
          <View>
            <Text>{`${data.payload}`}</Text>
          </View>
        )

      case MESSAGE_TYPE.TRANSFER:
        return (
          <CredentialTransferView
            credential={data.payload as VerifiableCredential}
            redirect={() => navigation.goBack()}
          />
        )

      case MESSAGE_TYPE.SDR:
        return (
          <SDRResponseContextProvider>
            <SDRequestView sdrDTO={data.payload as ISingleDisclosureDTO} />
          </SDRResponseContextProvider>
        )

      default:
        return <ErrorComponent />
    }
  }, [data])

  if (!route.params) {
    return <ErrorComponent />
  }

  if (isLoading) {
    return <ActivityIndicator color={Colors.blue400} />
  }

  return (
    <>
      <View style={[t.p4, t.justifyCenter]}>{!!data ? renderModalContent() : <ErrorComponent />}</View>
      <View style={[t.negativeZ, t.absolute, t.top0, t.bottom0, t.left0, t.right0, t.bgPrimary]} />
    </>
  )
}

export default ModalScreen
