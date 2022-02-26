import { Button, ButtonGroup, Divider, Icon } from '@chakra-ui/react'
import React from 'react'
import { Plus, Repeat } from 'react-feather'

interface IFormActionsProps {
  handleReset: (e: any) => void
  isSubmitting: boolean
  resetLabel?: string
  submitLabel?: string
}

// 'Create new credential'

export const FormActions = ({
  handleReset,
  isSubmitting,
  resetLabel = 'Reset',
  submitLabel = 'Submit',
}: IFormActionsProps) => {
  return (
    <>
      <Divider />
      <ButtonGroup w={['100%', null, 'fit-content']} alignSelf={'flex-end'} flexWrap={'wrap-reverse'} gap={4}>
        <Button
          onClick={handleReset}
          w={['100%', null, 'fit-content']}
          type="reset"
          size="lg"
          rightIcon={<Icon as={Repeat} />}
          fontSize={['md', 'lg', 'xl']}
        >
          {resetLabel}
        </Button>
        <Button
          isLoading={isSubmitting}
          w={['100%', null, 'fit-content']}
          type="submit"
          size="lg"
          rightIcon={<Icon as={Plus} />}
          fontSize={['md', 'lg', 'xl']}
        >
          {submitLabel}
        </Button>
      </ButtonGroup>
    </>
  )
}
