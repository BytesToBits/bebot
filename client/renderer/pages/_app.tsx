import type { AppProps } from 'next/app'
import { ChakraProvider, Image } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'
import theme from '../styles/theme'
import Router, { useRouter } from "next/router"
import Head from "next/head"

import "../styles/app.scss"
import ColorModeManager from '../components/ColorModeManager'
import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import useFetch from '../hooks/useFetch'

function MyApp({ Component, pageProps }: AppProps) {
  const Fetch = useFetch()
  const router = useRouter()

  useEffect(() => {
    if(!Fetch.hasFetched) {
      Fetch.init()
      ipcRenderer.on('goto', (_, page) => router.push(page))
    }
  })

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeManager />
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <Flex flexDirection="column" minH="100vh">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp