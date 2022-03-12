import React from 'react'
import { UniqueVerifiablePresentation } from '@veramo/data-store'
import { CardComponent } from '../card'

interface IPresentationProps {
  presentation: UniqueVerifiablePresentation
}

export const PresentationCard = ({ presentation }: IPresentationProps) => {
  const { verifiablePresentation } = presentation

  return (
    <CardComponent
      title={'Custom presentation'}
      content={verifiablePresentation.verifiableCredential[0].credentialSubject.claims}
      onPress={() => {}}
    />
  )
}
