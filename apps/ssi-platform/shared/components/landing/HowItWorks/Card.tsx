import React from 'react'
import { Flex, Heading, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'

interface ILandingCardProps {
  size?: 'full' | 'half'
  title: string
  subtitle?: string
  image?: any
}

export const Card = ({ size = 'half', title, subtitle, image }: ILandingCardProps) => {
  const getSize = () => {
    if (size === 'half') {
      return ['100%', '100%', '48%']
    }

    return '100%'
  }

  return (
    <Flex p={8} rounded={'lg'} shadow="2xl" background={'white'} minH={300} w={getSize()}>
      <Flex flexDirection={['column', 'column', 'row']} gap={4}>
        <Box w={['100%', '100%', '48%']}>
          <Heading>{title}</Heading>
          {subtitle && (
            <Text fontWeight={'500'} pt={2}>
              {subtitle}
            </Text>
          )}
        </Box>
        {image && (
          <Flex flexGrow={1} w={['100%', '100%', '48%']} justifyContent="center" alignItems={'center'}>
            <Image height={250} width={250} src={image} layout="fixed" />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
