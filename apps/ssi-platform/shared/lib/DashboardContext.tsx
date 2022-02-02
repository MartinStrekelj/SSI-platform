import React, { useContext, useEffect, useState } from 'react';
import { fetchIdentity } from 'apps/ssi-platform/shared/Api/IdentityApi';
import { IIdentity } from '@ssi-ms/interfaces';
import { NextRouter, useRouter } from 'next/router';
import { FullPageLoader } from '../components/loaders/fullpage';
import { useToasts } from '../hooks/useToasts';

interface IDashboardContext {
  identity: undefined | IIdentity;
  router?: NextRouter;
}

export const DashboardContext = React.createContext<IDashboardContext>({
  identity: undefined,
});

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardContextProvider = ({ children }) => {
  const [identity, setIdentity] = useState<undefined | IIdentity>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { dangerToast } = useToasts();
  const router = useRouter();

  useEffect(() => {
    const getIdentity = async () => {
      const response = await fetchIdentity();
      setLoading(false);
      if (!response.ok) {
        dangerToast({ description: response.message });
        return router.replace('/login');
      }
      setIdentity(response.identity);
    };

    getIdentity();
    return () => {};
  }, []);

  if (!identity || isLoading) {
    return <FullPageLoader />;
  }

  return (
    <DashboardContext.Provider
      value={{
        identity,
        router,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
