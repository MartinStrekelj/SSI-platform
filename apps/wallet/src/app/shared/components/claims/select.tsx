import React, { useCallback, useState } from 'react'
import { Checkbox, List } from 'react-native-paper'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { IClaim, IPresentationClaim } from '@ssi-ms/interfaces'
import { usePresentationContext } from '../../lib/PresentationCreateContext'

interface ISelectClaimsProps {
  credential: UniqueVerifiableCredential
}

interface ISelectOptionProps {
  claim: IPresentationClaim
}

export const SelectClaims = ({ credential }: ISelectClaimsProps) => {
  const [expanded, setExpanded] = useState(true)
  const renderClaim = useCallback((claim: IClaim, i: number) => {
    const presentationClaim: IPresentationClaim = { ...claim, vc: credential.hash }
    return <SelectOption key={i} claim={presentationClaim} />
  }, [])

  const claims = JSON.parse(credential.verifiableCredential.credentialSubject.claims) as IClaim[]

  const toggleList = () => setExpanded(!expanded)

  return (
    <List.Accordion
      title={credential.verifiableCredential.type[1]}
      left={(props) => <List.Icon {...props} icon="credit-card" />}
      expanded={expanded}
      onPress={toggleList}
    >
      {claims.map(renderClaim)}
    </List.Accordion>
  )
}

const SelectOption = ({ claim }: ISelectOptionProps) => {
  const { addClaim, removeClaim, isSelected } = usePresentationContext()

  const [checked, setChecked] = useState<'checked' | 'unchecked'>(isSelected(claim) ? 'checked' : 'unchecked')

  const toggleChecked = () => {
    const isChecked = checked === 'checked'
    if (isChecked) {
      setChecked('unchecked')
      removeClaim(claim)
      return
    }

    setChecked('checked')
    addClaim(claim)
  }

  return (
    <List.Item
      onPress={toggleChecked}
      title={`${claim.title} ${claim.type} ${claim.value}`}
      right={() => <Checkbox status={checked} />}
    />
  )
}
