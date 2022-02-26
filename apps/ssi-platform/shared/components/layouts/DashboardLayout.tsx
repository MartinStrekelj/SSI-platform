import React, { FC } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { SideNav } from '../sidenav'

const DashboardLayout: FC = ({ children }) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" h="100vh" gap={[1, null, 4]}>
      <GridItem
        colSpan={[2, null, 3]}
        h={'100%'}
        w={'100%'}
        borderRight={'1px'}
        borderColor={'blackAlpha.100'}
        boxShadow={'md'}
        overflowY={'auto'}
      >
        <SideNav />
      </GridItem>
      <GridItem colSpan={[10, null, 9]} h={'100%'} w={'100%'} padding={[8, null, 16]} overflowY={'auto'}>
        {children}
      </GridItem>
    </Grid>
  )
}

export default DashboardLayout
