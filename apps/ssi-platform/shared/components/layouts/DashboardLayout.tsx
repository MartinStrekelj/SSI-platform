import React, { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { SideNav } from '../sidenav';

const DashboardLayout: FC = ({ children }) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" minH="100vh" gap={[1, null, 4]}>
      <GridItem
        colSpan={[2, null, 4]}
        h={'100%'}
        w={'100%'}
        borderRight={'1px'}
        borderColor={'blackAlpha.100'}
        boxShadow={'md'}
      >
        <SideNav />
      </GridItem>
      <GridItem
        colSpan={[10, null, 8]}
        h={'100%'}
        w={'100%'}
        padding={[8, null, 16]}
        bg={'lightblue'}
      >
        {children}
      </GridItem>
    </Grid>
  );
};

export default DashboardLayout;
