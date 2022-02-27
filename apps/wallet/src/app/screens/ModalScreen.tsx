import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from '../types'
import { handleScanMessage, IScanMessagePayload } from '../shared/lib/CredentialService'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { ErrorComponent } from '../shared/components/Error'
import { MESSAGE_TYPE } from '@ssi-ms/interfaces'
import { CredentialTransferView } from '../shared/components/views/CredentialTransferView'
import { VerifiableCredential } from '@veramo/core'

import t from '../shared/theme'

type IModalScreenProps = NativeStackScreenProps<RootStackParamList, Screens.MODAL>

const ModalScreen = ({ navigation, route }: IModalScreenProps) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<IScanMessagePayload | undefined>(undefined)

  useEffect(() => {
    const onInit = async () => {
      try {
        const result = await handleScanMessage(route.params.message)
        setData(result)
        setLoading(false)
      } catch (e) {
        // Do nothing
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

  return <View style={[t.p4]}>{!!data ? renderModalContent() : <ErrorComponent />}</View>
}

export default ModalScreen
