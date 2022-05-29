import { UniqueVerifiableCredential, UniqueVerifiablePresentation } from '@veramo/data-store'
import { useState, useEffect } from 'react'
import { getLocalCredentials, getLocalPresentations } from '../Veramo/getLocalCredentials'

export const useCredentials = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false)

  const [myCredentials, setCredentials] = useState<undefined | UniqueVerifiableCredential[]>(undefined)
  const [myPresentations, setPresentations] = useState<undefined | UniqueVerifiablePresentation[]>(undefined)

  useEffect(() => {
    const fetchLocalCredentials = async () => {
      const credentials = await getLocalCredentials()
      const presentations = await getLocalPresentations()
      setCredentials(credentials)
      setPresentations(presentations)
      setLoading(false)
    }
    fetchLocalCredentials()
  }, [refresh])

  const useRefresh = () => setRefresh(!refresh)

  return { myCredentials, myPresentations, isLoading, useRefresh }
}
