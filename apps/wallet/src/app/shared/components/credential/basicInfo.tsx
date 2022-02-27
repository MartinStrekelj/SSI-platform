import { VerifiableCredential } from '@veramo/core'
import React from 'react'

import { BoxWidget } from '../widgets/BoxWidget'

interface IBasicInfoProps {
  credential: VerifiableCredential
}

export const CredentialBasicInfo = ({ credential }: IBasicInfoProps) => {
  const data = [
    ['From', credential.issuer.id],
    ['To', credential.credentialSubject.id],
    ['Expiry date', credential.issuanceDate],
    ['Issued on', credential.expirationDate ?? 'N/A'],
  ]
  return <BoxWidget body={data} title="Basic info" />
}
