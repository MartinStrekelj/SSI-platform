import React, { useState } from 'react';
import { LoginPage } from './page';

const Login = () => {
  const [publicDID, updatePublicDid] = useState<string>('');

  const onConnectWallet = () => {
    console.log(`Connect to wallet -> ${publicDID}`);
  };

  const onDownloadWallet = () => {
    console.log('Download wallet');
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
