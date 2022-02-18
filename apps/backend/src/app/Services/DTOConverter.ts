import { UniqueVerifiableCredential } from '@veramo/data-store'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'
import { VerifiableCredential } from '@veramo/core'

/**
 * Service to transform database entities to DTOs
 */
export const prepareVerifiableCredentialsDTOs = (VCs: UniqueVerifiableCredential[]) => {
  return VCs.map((VC) => prepareVerifiableCredentialsDTO(VC))
}

export const prepareVerifiableCredentialsDTO = (VC: UniqueVerifiableCredential) => {
  const DTO: IVerifiableCredentialDTO = {
    id: VC.hash,
    issuer: VC.verifiableCredential.issuer.id,
    subject: VC.verifiableCredential.credentialSubject.id,
    issuanceDate: VC.verifiableCredential.issuanceDate,
    expiryDate: VC.verifiableCredential.expirationDate || undefined,
    type: VC.verifiableCredential.type[1],
    claims: JSON.parse(VC.verifiableCredential.credentialSubject.claims),
  }
  return DTO
}

export const prepareDTOFromVC = (VC: VerifiableCredential) => {
  const DTO: IVerifiableCredentialDTO = {
    id: VC.id,
    issuer: VC.issuer.id,
    subject: VC.credentialSubject.id,
    issuanceDate: VC.issuanceDate,
    expiryDate: VC.expirationDate || undefined,
    type: VC.type[1],
    claims: JSON.parse(VC.credentialSubject.claims),
  }
  return DTO
}
