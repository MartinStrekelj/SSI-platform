import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import QRCodeScanner from 'react-native-qrcode-scanner'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type IScanScreenProps = NativeStackScreenProps<RootStackParamList, Screens.SCANNER>

const ScanScreen = ({ navigation }: IScanScreenProps) => {
  const onSuccess = (e) => navigation.replace(Screens.MODAL, { message: e.data as string })

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})

export default ScanScreen
