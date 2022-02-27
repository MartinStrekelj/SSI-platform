import { ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Button, Modal } from 'react-native-paper'

import t from '../../../theme'
import { IClaim } from '@ssi-ms/interfaces'
import ClaimOption from './option'

interface ISelectClaimsProps {
  selected: IClaim[]
  hideModal: () => void
  onSubmit: (claims: IClaim[]) => void
  visible: boolean
}

export const SelectClaimsModal = ({ selected, hideModal, onSubmit, visible }: ISelectClaimsProps) => {
  const [selectedClaims, setClaims] = useState<IClaim[]>([])

  const handleAddClaim = (c: IClaim) => setClaims([...selectedClaims, c])
  const handleRemoveClaim = (c: IClaim) => setClaims(selectedClaims.filter((cl) => cl.title !== c.title))

  const renderClaimOptions = useCallback(
    (claim: IClaim) => <ClaimOption claim={claim} addClaim={handleAddClaim} removeClaim={handleRemoveClaim} />,
    [selected]
  )

  return (
    <Modal
      contentContainerStyle={[t.border1, t.borderBlack, t.justifyStart, t.bgWhite, t.roundedSm]}
      style={[t.p6]}
      visible={visible}
      onDismiss={hideModal}
    >
      <ScrollView style={[t.p8]}>{!!selected && !!selected.length && selected.map(renderClaimOptions)}</ScrollView>
      <Button style={[t.bgPrimaryDark]} mode="contained" onPress={() => onSubmit(selectedClaims)}>
        Finish
      </Button>
    </Modal>
  )
}
