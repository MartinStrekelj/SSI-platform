import {
  Box,
  Wrap,
  Badge,
  Text,
  Flex,
  Icon,
  SlideFade,
} from '@chakra-ui/react';
import { IMenuCategory, INavItem } from '@ssi-ms/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface INavItemsProps {
  categories: IMenuCategory[];
}

export const SubItems = ({ categories }: INavItemsProps) => {
  if (categories.length <= 0) {
    return null;
  }

  const renderCategory = useCallback(
    (category: IMenuCategory) => (
      <Box key={category.category} paddingBottom={8}>
        <Flex alignItems={'center'}>
          <Badge
            colorScheme={category.color}
            w={4}
            h={4}
            rounded={'full'}
            mx={2}
          />
          <Text fontSize={['md', 'lg', '2xl']} fontWeight="bold">
            {category.category}
          </Text>
        </Flex>
        <Wrap paddingTop={4}>{category.items.map(renderCategoryItem)}</Wrap>
      </Box>
    ),
    [categories]
  );

  const renderCategoryItem = useCallback(
    (item: INavItem) => (
      <Link href={item.href} key={item.href}>
        <a>
          <SlideFade in={true} offsetY={'20px'}>
            <Box
              h={150}
              w={['100%', 250]}
              maxW={250}
              bg={'gray.100'}
              rounded={'md'}
              padding={4}
              _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            >
              <Icon as={item.icon} w={6} h={6} />
              <Text fontWeight={'bold'} fontSize={'lg'}>
                {item.title}
              </Text>
            </Box>
          </SlideFade>
        </a>
      </Link>
    ),
    [categories]
  );

  return <>{categories.map(renderCategory)}</>;
};
