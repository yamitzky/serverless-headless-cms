import React, { useEffect } from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { theme } from '~/theme'
import { AppContext, useApp } from '~/hooks/app'
import { AuthContext, useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'

function App({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter()
  const id = router.query.id as string

  const authCtx = useAuth()
  const appCtx = useApp(id)
  useEffect(() => {
    console.log('effect')
  }, [])

  return (
    <AuthContext.Provider value={authCtx}>
      <AppContext.Provider value={appCtx}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </AuthContext.Provider>
  )
}
export default App
