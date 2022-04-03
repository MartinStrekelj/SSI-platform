import { Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { GitHub } from 'react-feather'

const GITHUB_LINK = 'https://github.com/MartinStrekelj/SSI-platform'

const GithubButton = () => {
  const redirect = () => {
    location.href = GITHUB_LINK
  }

  return (
    <IconButton
      onClick={redirect}
      size={'lg'}
      rounded={'full'}
      aria-label="See Github"
      color={'white'}
      background={'blackAlpha.800'}
      _hover={{ color: 'black', background: 'ghostwhite', border: '1px solid black' }}
      icon={<Icon as={GitHub} w={6} h={6} />}
    />
  )
}

export default GithubButton
