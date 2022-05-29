import { FlatList, Text } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UniqueVerifiableCredential, UniqueVerifiablePresentation } from '@veramo/data-store'
import { Searchbar } from 'react-native-paper'
import { Credential } from './index'
import { PresentationCard } from './presentation'
import { isPresentation, IVerifiableData } from '@ssi-ms/interfaces'
import t from '../../theme'

interface IListCredentialsProps {
  credentials?: UniqueVerifiableCredential[]
  presentations?: UniqueVerifiablePresentation[]
  marked?: string[]
  withSearchBar?: boolean
  onCredentialClick?: (c: UniqueVerifiableCredential) => void
  onPresentationClick?: (c: UniqueVerifiablePresentation) => void
}

export const ListCredentials = ({
  credentials = [],
  presentations = [],
  withSearchBar = true,
  onCredentialClick = () => {},
  onPresentationClick = () => {},
  marked,
}: IListCredentialsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const allResults = useMemo(() => [...credentials, ...presentations], [credentials, presentations])
  const [filtered, setFiltered] = useState<IVerifiableData[] | undefined>(allResults)

  const renderCredential = useCallback(
    (credential: IVerifiableData) =>
      isPresentation(credential) ? (
        <PresentationCard
          key={credential.hash}
          presentation={credential}
          onPress={onPresentationClick}
          marked={marked && marked.includes(credential.hash)}
        />
      ) : (
        <Credential
          key={credential.hash}
          credential={credential}
          onPress={onCredentialClick}
          marked={marked && marked.includes(credential.hash)}
        />
      ),
    [filtered, onCredentialClick, marked, credentials, presentations]
  )

  useEffect(() => {
    if (!searchQuery.length) {
      setFiltered(allResults)
      return
    }

    setFiltered(
      credentials.filter(
        (credential) =>
          !!credential.verifiableCredential.type[1]?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    )
  }, [searchQuery])

  const onChangeSearch = (query: string) => setSearchQuery(query)

  return (
    <>
      {withSearchBar && (
        <Searchbar style={[t.mB1]} placeholder="Find credential..." onChangeText={onChangeSearch} value={searchQuery} />
      )}
      <FlatList
        ListEmptyComponent={<Text>No results found!</Text>}
        data={filtered}
        renderItem={({ item }) => renderCredential(item)}
        keyExtractor={({ hash }) => hash}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}
