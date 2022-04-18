import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList, Screens } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from '../shared/components/statusbar'
import { IClaim, isPresentation } from '@ssi-ms/interfaces'
import { formatDate } from '@ssi-ms/utils'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { BoxWidget } from '../shared/components/widgets/BoxWidget'

import t from '../shared/theme'

type ICredentialDetailsScreenProps = NativeStackScreenProps<RootStackParamList, Screens.CREDENTIAL_DETAILS>

type DetailsData = {
  title: string
  expiry?: string
  issuedOn?: string
  issuedBy: string
  claims: IClaim[]
}

const sectionStyles = [t.pX4, t.bgGray100, t.rounded, t.mT2, t.flex1]

const CredentialDetailsScreen = ({ navigation, route }: ICredentialDetailsScreenProps) => {
  const [data, setData] = useState<null | DetailsData>(null)

  useEffect(() => {
    const data = route.params
    let state: null | DetailsData = null
    if (isPresentation(data.data)) {
      const { verifiablePresentation } = data.data
      state = {
        title: 'Custom presentation',
        issuedOn: formatDate(verifiablePresentation.issuanceDate),
        expiry: formatDate(verifiablePresentation.expirationDate),
        claims: JSON.parse(verifiablePresentation.verifiableCredential[0].credentialSubject.claims) as IClaim[],
        issuedBy: `Self issued (but confirmed by RS Authority))`,
      }
    } else {
      const { verifiableCredential } = data.data
      state = {
        title: verifiableCredential.type[1],
        issuedOn: formatDate(verifiableCredential.issuanceDate),
        expiry: formatDate(verifiableCredential.expirationDate),
        claims: JSON.parse(verifiableCredential.credentialSubject.claims),
        issuedBy: verifiableCredential.issuer.id,
      }
    }
    setData(state)
  }, [route.params])

  if (data === null) {
    return <ActivityIndicator color={Colors.blue400} />
  }

  const basicInfo = {
    title: 'Basic information',
    body: [
      ['Issued by', data.issuedBy],
      ['Issued on', data.issuedOn],
      ['Expires at', data.expiry],
    ],
  }

  const claimsInfo = {
    title: 'Claims',
    head: ['Type', 'Value'],
    body: data.claims.map((claim) => [claim.title, claim.value]),
  }

  return (
    <>
      <StatusBar onBackClick={navigation.goBack} title={data.title.toLocaleUpperCase()} />
      <ScrollView style={[t.flex1]}>
        <View style={sectionStyles}>
          <BoxWidget title={basicInfo.title} body={basicInfo.body} />
        </View>
        <View style={sectionStyles}>
          <BoxWidget title={claimsInfo.title} head={claimsInfo.head} body={claimsInfo.body} />
        </View>
      </ScrollView>
    </>
  )
}

export default CredentialDetailsScreen
