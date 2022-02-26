import { Box, Divider, Heading } from '@chakra-ui/react'
import React from 'react'

interface IBasicWidgetProps {
  title: string
  children: React.ReactElement | React.ReactElement[]
}

export const BasicWidget = ({ title, children }: IBasicWidgetProps) => {
  return (
    <Box p={4} m={2}>
      <Heading fontSize={['lg', 'xl', '2xl']}>{title}</Heading>
      <Divider my={2} w="80%" />
      {children}
    </Box>
  )
}
