import { Grid, GridItem } from '@chakra-ui/react';
import { IconTray } from './icontray';
import React, { useState } from 'react';
import { MenuOptions } from '@ssi-ms/interfaces';
import { SubItems } from './subitems';
import { MENU_ITEMS } from './menu';

export const SideNav = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuOptions>(
    MenuOptions.CREDENTIAL_GENERATION
  );

  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      h="100%"
      gap={2}
      gridAutoColumns={'auto'}
      paddingRight={[0, 0, 2]}
    >
      <GridItem
        h={'100%'}
        maxW={'100px'}
        colSpan={[5, 5, 1]}
        borderRight={[0, 0, 2]}
        borderColor={'blackAlpha.100'}
      >
        <IconTray selectMenu={setSelectedMenu} selected={selectedMenu} />
      </GridItem>
      <GridItem colSpan={4} paddingTop={4} display={['none', 'none', 'block']}>
        <SubItems categories={MENU_ITEMS[selectedMenu]} />
      </GridItem>
    </Grid>
  );
};
