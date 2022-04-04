import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import ImageAsset from '../../../../public/assets/how-to-start.svg'

const HowToStartImage = () => {
  return (
    <Box display={['none', 'none', 'none', 'flex']}>
      <Image width={500} height={500} src={ImageAsset} layout="fixed" />
    </Box>
  )
}

export default HowToStartImage
