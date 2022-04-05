import React, { FC } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { SideNav } from '../sidenav'
import DashboardNav from '../dashboardnav'

const DashboardLayout: FC = ({ children }) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" h="100vh" gap={[1, null, 4]}>
      <GridItem
        colSpan={[1, null, 2]}
        h={'100%'}
        w={'100%'}
        borderRight={'1px'}
        borderColor={'blackAlpha.100'}
        boxShadow={'md'}
      >
        <SideNav />
      </GridItem>
      <GridItem colSpan={[11, null, 10]} h={'100%'} w={'100%'}>
        <DashboardNav />
        <Box padding={[8]} overflowY="auto" maxH={'calc(100vh - 80px)'}>
          {children}
        </Box>
      </GridItem>
    </Grid>
  )
}

export default DashboardLayout
