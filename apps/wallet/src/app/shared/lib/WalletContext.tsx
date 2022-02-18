// * Maybe add in the future

// import React, { useContext, useEffect, useState } from 'react'
// import { VerifiableCredential } from '@veramo/core'
// import { LZW_decode } from '@ssi-ms/utils'
// import unpackDIDMessage from '../Veramo/unpackDIDMessage'
// import { MESSAGE_TYPE } from '@ssi-ms/interfaces'

// interface IWalletContext {
//   PIN?: string
//   newCredential?: VerifiableCredential
//   handleScanMessage?: (v: string) => Promise<void>
// }

// export const WalletContext = React.createContext<IWalletContext>({
//   handleScanMessage: () => void
// })

// export const useWalletContext = () => useContext(WalletContext)

// export const WalletContextProvider = ({ children }) => {
//   const handleScanMessage = async (encodedMessage: string) => {
//     const lzw_decoded = LZW_decode(encodedMessage)
//     const message = await unpackDIDMessage(lzw_decoded)

//     switch (message.message.id) {
//       case MESSAGE_TYPE.LOGIN_2FA:
//         console.log(message.message)
//         break

//       case MESSAGE_TYPE.TRANSFER:
//         console.log(message.message)
//         break

//       default:
//         break
//     }
//   }

//   return <WalletContext.Provider value={{ handleScanMessage }}>{children}</WalletContext.Provider>
// }
