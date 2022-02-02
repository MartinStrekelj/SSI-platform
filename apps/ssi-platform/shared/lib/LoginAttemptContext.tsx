import React, { useContext, useEffect, useState } from 'react';
import { fetchIdentity } from 'apps/ssi-platform/shared/Api/IdentityApi';
import { useRouter } from 'next/router';
import { useToasts } from '../hooks/useToasts';
import { send2FAConfirmation, sendDIDforLogin } from '../Api/LoginApi';

interface ILoginAttemptContext {
  userDID: undefined | string;
  qrcode: undefined | string;
  setDID: (did: string) => void;
  setQR: (qr: string) => void;
  onConnectWallet: (v: string) => any;
  onDownloadWallet: () => void;
  handleEnteredPin: (pin: string) => any;
}

export const LoginAttemptContext = React.createContext<ILoginAttemptContext>({
  userDID: undefined,
  qrcode: undefined,
  setDID: (v: string) => {},
  setQR: (v: string) => {},
  onConnectWallet: (v: string) => {},
  onDownloadWallet: () => {},
  handleEnteredPin: (v: string) => {},
});

export const useLoginAttemptContext = () => useContext(LoginAttemptContext);

export const LoginContextProvider = ({ children }) => {
  const [userDID, setDID] = useState<string | undefined>('ow it works!');
  const [qrcode, setQR] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { dangerToast, successToast } = useToasts();

  const onConnectWallet = async (didValue: string) => {
    const response = await sendDIDforLogin(didValue);
    if (!response.ok) {
      return dangerToast({ description: response.message as string });
    }
    // update the context
    setDID(didValue);
    setQR(response.message as string);

    // If authority redirect to dashboard
    if (response.accessGranted) {
      return router.replace('/dashboard');
    }

    return router.push('/login/pin');
  };

  const onDownloadWallet = () => {
    console.log('Download wallet'); // To be added in future releases
  };

  const handleEnteredPin = async (pin: string) => {
    const data = { PIN: pin.toUpperCase(), did: userDID };
    const response = await send2FAConfirmation(data);
    if (!response.ok) {
      return dangerToast({ description: response.message });
    }
    successToast({});
    return router.replace('/dashboard');
  };

  useEffect(() => {
    const getIdentity = async () => {
      const response = await fetchIdentity();
      if (response.ok) {
        return router.replace('/dashboard');
      }
    };
    getIdentity();
    return () => {};
  }, []);

  return (
    <LoginAttemptContext.Provider
      value={{
        userDID,
        qrcode,
        setDID: (value) => setDID(value),
        setQR: (value) => setQR(value),
        onConnectWallet,
        onDownloadWallet,
        handleEnteredPin,
      }}
    >
      {children}
    </LoginAttemptContext.Provider>
  );
};
