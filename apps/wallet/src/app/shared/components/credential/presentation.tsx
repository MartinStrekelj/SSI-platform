import React from 'react'
import { UniqueVerifiablePresentation } from '@veramo/data-store'
import { CardComponent } from '../card'

interface IPresentationProps {
  presentation: UniqueVerifiablePresentation
  onPress: (c: UniqueVerifiablePresentation) => void
  marked?: boolean
}

export const PresentationCard = ({ presentation, onPress, marked = false }: IPresentationProps) => {
  const { verifiablePresentation } = presentation

  return (
    <CardComponent
      marked={marked}
      title={'Custom presentation'}
      content={verifiablePresentation.verifiableCredential[0].credentialSubject.claims}
      onPress={() => onPress(presentation)}
    />
  )
}
