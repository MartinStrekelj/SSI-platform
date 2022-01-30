import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

const Noop = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const ContextProvider = Component.provider || Noop;
  // @ts-ignore
  const Layout = Component.layout || Noop;

  return (
    <ChakraProvider>
      <Layout>
        <ContextProvider>
          <Head>
            <title>SSI Platform</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </ContextProvider>
      </Layout>
    </ChakraProvider>
  );
};

export default CustomApp;
