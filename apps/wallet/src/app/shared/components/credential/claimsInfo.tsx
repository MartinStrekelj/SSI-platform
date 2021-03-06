import { View, Text } from 'react-native'
import React from 'react'
import { VerifiableCredential } from '@veramo/core'
import { IClaim } from '@ssi-ms/interfaces'
import { BoxWidget } from '../widgets/BoxWidget'

interface IClaimInfoProps {
  credential: VerifiableCredential
}

const ClaimsInfo = ({ credential }: IClaimInfoProps) => {
  const claims = JSON.parse(credential.credentialSubject.claims)
  const data = {
    head: ['Title', 'Value'],
    body: [...claims.map((claim: IClaim) => [claim.title, claim.value])],
  }
  return <BoxWidget title="Claims" head={data.head} body={data.body} />
}

export default ClaimsInfo
