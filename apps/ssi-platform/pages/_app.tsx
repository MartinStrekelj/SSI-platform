import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

const Noop = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const ContextProvider = Component.provider || Noop;
  return (
    <ChakraProvider>
      <ContextProvider>
        <Head>
          <title>SSI Platform</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ContextProvider>
    </ChakraProvider>
  );
};

export default CustomApp;
