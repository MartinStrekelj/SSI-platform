import React from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { CardComponent } from '../card'
interface ICredentialProps {
  credential: UniqueVerifiableCredential
  onPress: (c: UniqueVerifiableCredential) => void
  marked?: boolean
}

export const Credential = ({ credential, onPress, marked = false }: ICredentialProps) => {
  const { verifiableCredential } = credential
  const title = verifiableCredential.type[1]

  /**
   * Credential is part of presentation
   * so no need to display it here
   */
  if (!title) {
    return null
  }

  return (
    <CardComponent
      title={title}
      content={verifiableCredential.credentialSubject.claims}
      marked={marked}
      onPress={() => onPress(credential)}
    />
  )
}
