import { Center, Flex, Icon, IconButton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IClaim } from '@ssi-ms/interfaces'
import { Award, Edit, Plus } from 'react-feather'
import { RowWidget } from '../../../widgets/row'

const BOX_HEIGHT = 250

interface IClaimBoxProps {
  claim: IClaim
  onEdit?: (c: IClaim) => void
}

interface IAddClaimBoxProps {
  onClick: () => void
}

export const ClaimsBox = ({ claim, onEdit }: IClaimBoxProps) => {
  return (
    <Center w={'100%'} h={BOX_HEIGHT} rounded={'lg'} bg={'gray.50'} boxShadow={'md'} position={'relative'}>
      <VStack padding={[4, 8]} textTransform={'uppercase'} fontWeight={'bold'}>
        <Icon as={Award} w={[4, 8, 12]} h={[4, 8, 12]} />
        <Flex>
          <RowWidget attribute={claim.title} value={`${claim.value}`} />
        </Flex>
      </VStack>
      <IconButton
        position={'absolute'}
        top={0}
        right={0}
        colorScheme={'yellow'}
        aria-label="edit claim"
        icon={<Icon as={Edit} />}
        onClick={() => onEdit(claim)}
      />
    </Center>
  )
}

export const AddClaimsBox = ({ onClick }: IAddClaimBoxProps) => {
  return (
    <Center
      w={'100%'}
      h={BOX_HEIGHT}
      rounded={'lg'}
      bg={'gray.50'}
      _hover={{ cursor: 'pointer', bg: 'gray.100' }}
      onClick={onClick}
      boxShadow={'lg'}
    >
      <VStack>
        <Icon as={Plus} h={12} w={12} />
        <Text fontWeight={'bold'}>Add Claim</Text>
      </VStack>
    </Center>
  )
}
