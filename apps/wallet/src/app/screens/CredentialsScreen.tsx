import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import getLocalCredentials from '../shared/Veramo/getLocalCredentials'
import { ListCredentials } from '../components/credential/list'

import t from '../shared/theme'

const CredentialsScreen = () => {
  const [myCredentials, setCredentials] = useState<undefined | UniqueVerifiableCredential[]>(undefined)

  useEffect(() => {
    const fetchLocalCredentials = async () => {
      const credentials = await getLocalCredentials()
      setCredentials(credentials)
    }
    fetchLocalCredentials()
  }, [])

  return (
    <SafeAreaView style={[t.pX4, t.pT1]}>
      <ListCredentials credentials={myCredentials} withSearchBar />
    </SafeAreaView>
  )
}

export default CredentialsScreen
