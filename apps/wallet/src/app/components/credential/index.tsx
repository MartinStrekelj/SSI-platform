import React from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Card, Title, Paragraph, Colors } from 'react-native-paper'

interface ICredentialProps {
  credential: UniqueVerifiableCredential
}

export const Credential = ({ credential }: ICredentialProps) => {
  const { verifiableCredential } = credential
  return (
    <Card
      mode={'elevated'}
      style={{ marginVertical: 10, padding: 5, borderRadius: 10, backgroundColor: Colors.blue500 }}
    >
      <Card.Title title={verifiableCredential.type[1]} />
      <Card.Content>
        <Title>{verifiableCredential.credentialSubject.id}</Title>
        <Paragraph>{verifiableCredential.credentialSubject.claims}</Paragraph>
      </Card.Content>
    </Card>
  )
}
