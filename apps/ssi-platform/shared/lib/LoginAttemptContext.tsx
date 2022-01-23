import React, { useContext, useState } from 'react';

interface ILoginAttemptContext {
  userDID: undefined | string;
  qrcode: undefined | string;
  setDID: (did: string) => void;
  setQR: (qr: string) => void;
}

export const LoginAttemptContext = React.createContext<ILoginAttemptContext>({
  userDID: undefined,
  qrcode: undefined,
  setDID: (v: string) => {},
  setQR: (v: string) => {},
});

export const useLoginAttemptContext = () => useContext(LoginAttemptContext);

export const LoginContextProvider = ({ children }) => {
  const [userDID, setDID] = useState<string | undefined>('ow it works!');
  const [qrcode, setQR] = useState<string | undefined>(undefined);
  return (
    <LoginAttemptContext.Provider
      value={{
        userDID,
        qrcode,
        setDID: (value) => setDID(value),
        setQR: (value) => setQR(value),
      }}
    >
      {children}
    </LoginAttemptContext.Provider>
  );
};
