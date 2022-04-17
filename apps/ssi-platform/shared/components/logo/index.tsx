import { Heading } from '@chakra-ui/react'
import React from 'react'

interface ILogoProps {
  white?: boolean
}

const Logo = ({ white = false }: ILogoProps) => {
  return (
    <Heading
      bgGradient={`linear(to-r, ${white ? 'white, white' : 'primary.600, primary.500, secondary.500'})`}
      bgClip="text"
      fontSize={['4xl', '5xl', '6xl']}
      fontWeight="extrabold"
      textTransform={'uppercase'}
      userSelect="none"
    >
      SSI
    </Heading>
  )
}

export default Logo
