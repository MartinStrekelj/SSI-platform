import { ScrollView, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Searchbar } from 'react-native-paper'

import { Credential } from './index'

interface IListCredentialsProps {
  credentials?: UniqueVerifiableCredential[]
  withSearchBar?: boolean
}

export const ListCredentials = ({ credentials, withSearchBar = true }: IListCredentialsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const renderCredential = useCallback(
    (credential: UniqueVerifiableCredential) => <Credential key={credential.hash} credential={credential} />,
    [credentials]
  )

  if (!credentials) {
    return <Text>Could not get credentials</Text>
  }

  if (credentials.length <= 0) {
    return <Text>You have no stored credentials</Text>
  }

  const onChangeSearch = (query) => setSearchQuery(query)

  return (
    <>
      {withSearchBar && <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />}
      <ScrollView>{credentials.map(renderCredential)}</ScrollView>
    </>
  )
}
