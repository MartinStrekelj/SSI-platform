import React, { useLayoutEffect } from 'react';
import { PinPage } from './page';

import {
  useLoginAttemptContext,
  LoginContextProvider,
} from 'apps/ssi-platform/shared/lib/LoginAttemptContext';
import { useRouter } from 'next/router';
import { send2FAConfirmation } from 'apps/ssi-platform/shared/Api/LoginApi';
import { useToasts } from 'apps/ssi-platform/shared/hooks/useToasts';

const Pin = () => {
  const { qrcode, userDID } = useLoginAttemptContext();
  const router = useRouter();
  const { dangerToast, successToast } = useToasts();

  const handleEnteredPin = async (pin: string) => {
    const data = { PIN: pin.toUpperCase(), did: userDID };
    const response = await send2FAConfirmation(data);
    if (!response.ok) {
      return dangerToast({ description: response.message });
    }
    return successToast({});
  };

  // Go back to initial step if no qrcode present
  useLayoutEffect(() => {
    if (qrcode === undefined || userDID === undefined) {
      console.log('redirected');
      router.push('/login');
    }
  }, []);

  return <PinPage qrcode={qrcode} onPinEntered={handleEnteredPin} />;
};

export default Pin;
Pin.provider = LoginContextProvider;
