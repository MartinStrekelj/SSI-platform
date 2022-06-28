import { VerifiableCredential } from '@veramo/core'
import React from 'react'
import { formatDate } from '@ssi-ms/utils'

import { BoxWidget } from '../widgets/BoxWidget'

interface IBasicInfoProps {
  credential: VerifiableCredential
}

export const CredentialBasicInfo = ({ credential }: IBasicInfoProps) => {
  const data = [
    ['From', credential.issuer.id],
    ['To', credential.credentialSubject.id],
    ['Expiry date', formatDate(credential.issuanceDate)],
    ['Issued on', formatDate(credential.expirationDate)],
  ]
  return <BoxWidget body={data} title="Basic information" />
}
