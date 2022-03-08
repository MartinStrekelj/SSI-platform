import React, { createContext, useContext, useState } from 'react'
import { IPresentationClaim } from '@ssi-ms/interfaces'
import { claimsMatches } from '@ssi-ms/utils'
import { createPresentationRequest } from '../Api/CredentialsApi'

interface IPresentationCreate {
  selectedClaims: IPresentationClaim[]
  addClaim: (c: IPresentationClaim) => void
  removeClaim: (c: IPresentationClaim) => void
  createNewPresentation: () => void
  isSelected: (c: IPresentationClaim) => boolean
}

interface IProvider {
  children: React.ReactNode
}

const PresentationCreateContext = createContext<IPresentationCreate>({
  selectedClaims: [],
  addClaim: (c: IPresentationClaim) => {},
  removeClaim: (c: IPresentationClaim) => {},
  createNewPresentation: () => {},
  isSelected: (c: IPresentationClaim) => false,
})

export const usePresentationContext = () => useContext(PresentationCreateContext)

const PresentationCreateContextProvider = ({ children }: IProvider) => {
  const [selectedClaims, setSelectedClaims] = useState<IPresentationClaim[]>([])

  const addClaim = (claim: IPresentationClaim) => setSelectedClaims([...selectedClaims, claim])

  const removeClaim = (claim: IPresentationClaim) =>
    setSelectedClaims(selectedClaims.filter((selected) => !claimsMatches(selected, claim)))

  const createNewPresentation = async () => {
    const response = await createPresentationRequest(selectedClaims)
  }

  const isSelected = (claim: IPresentationClaim) =>
    selectedClaims.some((selected) => claimsMatches(claim, selected) && claim.vc === selected.vc)

  return (
    <PresentationCreateContext.Provider
      value={{ selectedClaims, addClaim, removeClaim, createNewPresentation, isSelected }}
    >
      {children}
    </PresentationCreateContext.Provider>
  )
}

export default PresentationCreateContextProvider
