import { ISendVerifiableDataForSDR, IVerifiableData } from '@ssi-ms/interfaces'
import React, { createContext, useState, useContext } from 'react'
import { verifyDataRequest } from '../Api/CredentialsApi'

interface ISDRResponseContext {
  response: null | boolean
  verifiableData: IVerifiableData[]
  marked: string[]
  addVerifiableData: (v: IVerifiableData) => void
  removeVerifiableData: (v: IVerifiableData) => void
  onSubmitRequest: (sdrId: string) => Promise<void>
}

const SDRResponseContext = createContext<ISDRResponseContext>({
  response: null,
  verifiableData: [],
  marked: [],
  onSubmitRequest: async (v: string) => {},
  addVerifiableData: (v: IVerifiableData) => {},
  removeVerifiableData: (v: IVerifiableData) => {},
})

interface IProviderProps {
  children: React.ReactNode
}

export const useSDRContext = () => useContext(SDRResponseContext)

export const SDRResponseContextProvider = ({ children }: IProviderProps) => {
  const [verifiableData, setVerifiableData] = useState<IVerifiableData[]>([])
  const [response, setResponse] = useState<null | boolean>(null)

  const addVerifiableData = (v: IVerifiableData) => setVerifiableData([...verifiableData, v])
  const removeVerifiableData = (v: IVerifiableData) =>
    setVerifiableData(verifiableData.filter((vd) => vd.hash !== v.hash))

  const handleSubmit = async (sdrKey: string) => {
    const payload: ISendVerifiableDataForSDR = {
      sdrKey,
      data: verifiableData,
    }

    const response = await verifyDataRequest(payload)
    setResponse(response.ok)
  }

  return (
    <SDRResponseContext.Provider
      value={{
        response,
        verifiableData,
        addVerifiableData,
        removeVerifiableData,
        onSubmitRequest: handleSubmit,
        marked: verifiableData.map((v) => v.hash),
      }}
    >
      {children}
    </SDRResponseContext.Provider>
  )
}
