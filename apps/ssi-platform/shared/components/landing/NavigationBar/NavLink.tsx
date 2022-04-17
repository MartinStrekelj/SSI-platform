import { Text } from '@chakra-ui/react'
import React from 'react'

interface INavLinkProps {
  label: string
  href?: string
}

export const NavLink = ({ label, href = '' }: INavLinkProps) => {
  return (
    <a href={`#${href}`}>
      <Text textAlign={'center'} fontWeight={'600'} fontSize={['md', null, 'xl']} _hover={{ color: 'primary.400' }}>
        {label}
      </Text>
    </a>
  )
}
