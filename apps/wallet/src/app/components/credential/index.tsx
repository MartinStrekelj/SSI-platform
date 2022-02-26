import React from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Card, Title, Paragraph, Colors } from 'react-native-paper'

import t from '../../shared/theme'
interface ICredentialProps {
  credential: UniqueVerifiableCredential
  onPress: (c: UniqueVerifiableCredential) => void
  marked?: boolean
}

export const Credential = ({ credential, onPress, marked = false }: ICredentialProps) => {
  const { verifiableCredential } = credential
  return (
    <Card
      onPress={() => onPress(credential)}
      mode={'elevated'}
      style={[
        t.mY10,
        t.p5,
        t.roundedLg,
        t.bgPrimaryDark,
        t.shadow2xl,
        marked ? t.border2 : t.border0,
        t.borderPrimaryLight,
      ]}
    >
      <Card.Title title={verifiableCredential.type[1]} />
      <Card.Content>
        <Title>{verifiableCredential.credentialSubject.id}</Title>
        <Paragraph>{verifiableCredential.credentialSubject.claims}</Paragraph>
      </Card.Content>
    </Card>
  )
}

// { marginVertical: 10, padding: 5, borderRadius: 10, backgroundColor: Colors.blue500 }