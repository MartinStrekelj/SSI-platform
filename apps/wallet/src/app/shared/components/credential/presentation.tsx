import React from 'react'
import { UniqueVerifiablePresentation } from '@veramo/data-store'
import { CardComponent } from '../card'
import { formatDate } from '@ssi-ms/utils'

interface IPresentationProps {
  presentation: UniqueVerifiablePresentation
  onPress: (c: UniqueVerifiablePresentation) => void
  marked?: boolean
}

export const PresentationCard = ({ presentation, onPress, marked = false }: IPresentationProps) => {
  const { verifiablePresentation } = presentation

  const content = `Created on: ${formatDate(verifiablePresentation.issuanceDate)}`

  return (
    <CardComponent
      marked={marked}
      title={verifiablePresentation.type[1] || 'Custom presentation'}
      content={content}
      onPress={() => onPress(presentation)}
    />
  )
}
