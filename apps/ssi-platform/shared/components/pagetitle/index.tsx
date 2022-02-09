import { Heading } from '@chakra-ui/react'
import React from 'react'

interface IPageTitleProps {
  label: string
}

export const PageTitle = ({ label }: IPageTitleProps) => {
  return (
    <Heading pb={6} fontSize={['2xl', '4xl', '6xl']}>
      {label}
    </Heading>
  )
}
