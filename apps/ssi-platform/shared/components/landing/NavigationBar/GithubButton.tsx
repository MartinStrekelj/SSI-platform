import { Button, Icon, IconButton } from '@chakra-ui/react'
import React from 'react'
import { GitHub } from 'react-feather'
import { GITHUB_LINK } from '..'

interface IGithubButtonProps {
  withLabel?: boolean
}

const GithubButton = ({ withLabel = false }) => {
  if (withLabel) {
    return (
      <Button size={'lg'} rightIcon={<Icon as={GitHub} />} as={'a'} href={GITHUB_LINK} variant={'github'}>
        See Github
      </Button>
    )
  }

  return (
    <IconButton
      target={'_blank'}
      as={'a'}
      href={GITHUB_LINK}
      size={'lg'}
      aria-label="See Github"
      icon={<Icon as={GitHub} w={6} h={6} />}
      variant="github"
    />
  )
}

export default GithubButton
