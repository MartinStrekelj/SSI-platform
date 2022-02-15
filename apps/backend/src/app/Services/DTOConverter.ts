import { UniqueVerifiableCredential } from '@veramo/data-store'
import { IVerifiableCredentialDTO } from '@ssi-ms/interfaces'

/**
 * Service to transform database entities to DTOs
 */
export const prepareVerifiableCredentialsDTOs = (VCs: UniqueVerifiableCredential[]) => {
  return VCs.map((VC) => {
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
  })
}
