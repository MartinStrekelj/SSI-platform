import React, { createContext, useContext, useState } from 'react'
import { IPresentationClaim } from '@ssi-ms/interfaces'
import { claimsMatches } from '@ssi-ms/utils'
import { createPresentationRequest } from '../Api/CredentialsApi'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Screens } from '../../types'

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

interface ISnackbarComponent {
  message: string
  onDismissAction: () => void
}

export const usePresentationContext = () => useContext(PresentationCreateContext)

const PresentationCreateContextProvider = ({ children }: IProvider) => {
  const [selectedClaims, setSelectedClaims] = useState<IPresentationClaim[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState<ISnackbarComponent | null>(null)
  const navigation = useNavigation()

  const addClaim = (claim: IPresentationClaim) => setSelectedClaims([...selectedClaims, claim])

  const removeClaim = (claim: IPresentationClaim) =>
    setSelectedClaims(selectedClaims.filter((selected) => !claimsMatches(selected, claim)))

  const createNewPresentation = async () => {
    setLoading(true)
    const response = await createPresentationRequest(selectedClaims)
    setLoading(false)
    if (response.ok) {
      return setSnackbar({
        message: response.message,
        // @ts-ignore
        onDismissAction: () => navigation.navigate(Screens.CREDENTIALS, {}),
      })
    }
    return setSnackbar({
      message: response.message,
      onDismissAction: () => setSnackbar(null),
    })
  }

  const handleSnackbarDismiss = () => {
    if (!!snackbar) {
      return snackbar.onDismissAction()
    }
    setSnackbar(null)
  }

  const isSelected = (claim: IPresentationClaim) =>
    selectedClaims.some((selected) => claimsMatches(claim, selected) && claim.vc === selected.vc)

  return (
    <PresentationCreateContext.Provider
      value={{ selectedClaims, addClaim, removeClaim, createNewPresentation, isSelected }}
    >
      {isLoading ? <ActivityIndicator /> : children}
      <Snackbar onDismiss={handleSnackbarDismiss} visible={!!snackbar} duration={300}>
        {!!snackbar ? snackbar.message : 'Woops something went wrong'}
      </Snackbar>
    </PresentationCreateContext.Provider>
  )
}

export default PresentationCreateContextProvider
