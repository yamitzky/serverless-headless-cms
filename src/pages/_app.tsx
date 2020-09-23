import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { theme } from '~/theme'

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default App
