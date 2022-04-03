import { Button, Icon } from '@chakra-ui/react'
import React from 'react'
import { ChevronRight } from 'react-feather'

const NavButton = ({ label }) => {
  return (
    <Button rightIcon={<Icon as={ChevronRight} />} variant="primary" size={'lg'}>
      {label}
    </Button>
  )
}

export default NavButton
