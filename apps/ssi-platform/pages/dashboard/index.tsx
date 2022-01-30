import { DashboardContextProvider } from 'apps/ssi-platform/shared/lib/DashboardContext';
import React from 'react';
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout';
import { Box } from '@chakra-ui/react';

const Dashboard = () => {
  return <Box>Dashboard</Box>;
};

export default Dashboard;
Dashboard.provider = DashboardContextProvider;
Dashboard.layout = DashboardLayout;
