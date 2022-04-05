import { Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { ChevronRight } from 'react-feather'

const NavButton = ({ label }) => {
  const router = useRouter()
  const goToDashboard = () => router.push('/login')

  return (
    <Button rightIcon={<Icon as={ChevronRight} />} variant="primary" size={'lg'} onClick={goToDashboard}>
      {label}
    </Button>
  )
}

export default NavButton
