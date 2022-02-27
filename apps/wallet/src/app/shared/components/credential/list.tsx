import { ScrollView, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { UniqueVerifiableCredential } from '@veramo/data-store'
import { Searchbar } from 'react-native-paper'

import { Credential } from './index'

interface IListCredentialsProps {
  credentials?: UniqueVerifiableCredential[]
  marked?: string[]
  withSearchBar?: boolean
  onCredentialClick?: (c: UniqueVerifiableCredential) => void
}

export const ListCredentials = ({
  credentials,
  withSearchBar = true,
  onCredentialClick,
  marked,
}: IListCredentialsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filtered, setFiltered] = useState<UniqueVerifiableCredential[] | undefined>(credentials)

  const renderCredential = useCallback(
    (credential: UniqueVerifiableCredential) => (
      <Credential
        key={credential.hash}
        credential={credential}
        onPress={onCredentialClick}
        marked={marked && marked.includes(credential.hash)}
      />
    ),
    [filtered, onCredentialClick, marked]
  )

  useEffect(() => {
    if (!searchQuery.length) {
      setFiltered(credentials)
      return
    }

    setFiltered(
      credentials.filter((credential) =>
        credential.verifiableCredential.type[1].toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    )
  }, [searchQuery])

  const onChangeSearch = (query: string) => setSearchQuery(query)

  console.log({ credentials, filtered })
  return (
    <>
      {withSearchBar && <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />}
      <ScrollView>{filtered && filtered.map(renderCredential)}</ScrollView>
      <Text>{filtered && filtered.length === 0 && 'No credentials found'}</Text>
    </>
  )
}
