import { sendDIDforLogin } from 'apps/ssi-platform/shared/Api/LoginApi';
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts';
import React, { useState } from 'react';
import { LoginPage } from './page';
import {
  useLoginAttemptContext,
  LoginContextProvider,
} from 'apps/ssi-platform/shared/lib/LoginAttemptContext';
import { useRouter } from 'next/router';

const Login = () => {
  const [publicDID, updatePublicDid] = useState<string>('');
  const { dangerToast } = useToasts();
  const { setQR, setDID } = useLoginAttemptContext();
  const router = useRouter();

  const onConnectWallet = async () => {
    const response = await sendDIDforLogin(publicDID);
    if (!response.ok) {
      return dangerToast({ description: response.message as string });
    }
    // update the context
    setDID(publicDID);
    setQR(response.message as string);
    return router.push('/login/pin');
  };

  const onDownloadWallet = () => {
    console.log('Download wallet'); // To be added in future releases
  };

  return (
    <LoginPage
      onConnectWallet={onConnectWallet}
      onDownloadWallet={onDownloadWallet}
      handleDidChange={(value) => updatePublicDid(value)}
    />
  );
};

export default Login;
Login.provider = LoginContextProvider;
