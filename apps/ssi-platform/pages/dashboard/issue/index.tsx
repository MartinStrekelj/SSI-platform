import { Heading } from '@chakra-ui/react';
import DashboardLayout from 'apps/ssi-platform/shared/components/layouts/DashboardLayout';
import React, { useEffect } from 'react';
import {
  DashboardContextProvider,
  useDashboardContext,
} from 'apps/ssi-platform/shared/lib/DashboardContext';
import { Breadcrumbs } from 'apps/ssi-platform/shared/components/breadcrumbs';
import { CreateNewVCForm } from 'apps/ssi-platform/shared/components/forms/CreateNewVCForm';
import { hasRoleIssuer } from '@ssi-ms/interfaces';

const Issue = () => {
  const { router, identity } = useDashboardContext();

  return (
    <>
      <Breadcrumbs pathname={router.pathname} />
      <Heading pb={6} fontSize={['2xl', '4xl', '6xl']}>
        Issue a new credential
      </Heading>
      <CreateNewVCForm issuer={identity} />
    </>
  );
};

export default Issue;
Issue.layout = DashboardLayout;
Issue.provider = DashboardContextProvider;
