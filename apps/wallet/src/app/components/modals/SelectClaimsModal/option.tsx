import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IClaim } from '@ssi-ms/interfaces'
import { Switch } from 'react-native-paper'

import t from '../../../shared/theme'

interface IClaimOptionProps {
  claim: IClaim
  addClaim: (claim: IClaim) => void
  removeClaim: (claim: IClaim) => void
}

const ClaimOption = ({ claim, addClaim, removeClaim }: IClaimOptionProps) => {
  const [switchOn, toggleSwitch] = useState<boolean>(false)

  useEffect(() => {
    if (switchOn) {
      return addClaim(claim)
    }
    removeClaim(claim)
  }, [switchOn])

  const formatText = () => `${claim.title} ${claim.type} ${claim.value}`

  return (
    <View style={[t.flexRow, t.itemsCenter, t.mY1]}>
      <Switch value={switchOn} onValueChange={() => toggleSwitch(!switchOn)} />
      <Text style={[t.fontSansBold, t.textXl]}> {formatText()}</Text>
    </View>
  )
}

export default ClaimOption
