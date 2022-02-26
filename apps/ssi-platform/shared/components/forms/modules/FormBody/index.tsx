import { VStack } from '@chakra-ui/react'
import React from 'react'

interface IFormBodyProps {
  children: React.ReactNode
}

const FormBody = ({ children }: IFormBodyProps) => {
  return (
    <VStack gap={4} w={'100%'} maxW={750}>
      {children}
    </VStack>
  )
}

export default FormBody
