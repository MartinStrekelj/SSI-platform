import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../shared/theme'
import './global.css'

const Noop = ({ children }) => <>{children}</>

const CustomApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const ContextProvider = Component.provider || Noop
  // @ts-ignore
  const Layout = Component.layout || Noop

  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <Layout>
          <Head>
            <title>SSI Platform</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,700;1,400&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </Layout>
      </ContextProvider>
    </ChakraProvider>
  )
}

export default CustomApp
