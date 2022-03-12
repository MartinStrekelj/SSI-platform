import { ScrollView, Text } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UniqueVerifiableCredential, UniqueVerifiablePresentation } from '@veramo/data-store'
import { Searchbar } from 'react-native-paper'
import { Credential } from './index'
import { PresentationCard } from './presentation'

interface IListCredentialsProps {
  credentials?: UniqueVerifiableCredential[]
  presentations?: UniqueVerifiablePresentation[]
  marked?: string[]
  withSearchBar?: boolean
  onCredentialClick?: (c: UniqueVerifiableCredential) => void
}

type IResultType = UniqueVerifiableCredential | UniqueVerifiablePresentation

const isPresentation = (result: any): result is UniqueVerifiablePresentation =>
  result.verifiablePresentation !== undefined

export const ListCredentials = ({
  credentials = [],
  presentations = [],
  withSearchBar = true,
  onCredentialClick,
  marked,
}: IListCredentialsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const allResults = useMemo(() => [...credentials, ...presentations], [credentials, presentations])
  const [filtered, setFiltered] = useState<IResultType[] | undefined>(allResults)

  const renderCredential = useCallback(
    (credential: IResultType) =>
      isPresentation(credential) ? (
        <PresentationCard presentation={credential} />
      ) : (
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
      setFiltered(allResults)
      return
    }

    setFiltered(
      credentials.filter((credential) =>
        credential.verifiableCredential.type[1].toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )
    )
  }, [searchQuery])

  const onChangeSearch = (query: string) => setSearchQuery(query)

  return (
    <>
      {withSearchBar && <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />}
      <Text>{filtered && filtered.length === 0 && 'No results found'}</Text>
      <ScrollView>{filtered && filtered.map(renderCredential)}</ScrollView>
    </>
  )
}
