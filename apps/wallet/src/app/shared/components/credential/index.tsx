import React from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { CardComponent } from '../card'
import { formatDate } from '@ssi-ms/utils'
interface ICredentialProps {
  credential: UniqueVerifiableCredential
  onPress: (c: UniqueVerifiableCredential) => void
  marked?: boolean
}

export const Credential = ({ credential, onPress, marked = false }: ICredentialProps) => {
  const { verifiableCredential } = credential
  const title = verifiableCredential.type[1]
  const content = `Issued on: ${formatDate(verifiableCredential.issuanceDate)}`

  /**
   * Credential is part of presentation
   * so no need to display it here
   */
  if (!title) {
    return null
  }

  return <CardComponent title={title} content={content} marked={marked} onPress={() => onPress(credential)} />
}
