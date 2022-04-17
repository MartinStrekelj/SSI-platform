import React from 'react'
import Image from 'next/image'
import ImageAsset from '../../../../public/assets/main-landing-image.svg'
import { Box } from '@chakra-ui/react'

export const LandingImage = () => {
  return (
    <Box display={['none', 'none', 'block']}>
      <Image width={600} height={500} src={ImageAsset} layout="fixed" />
    </Box>
  )
}
