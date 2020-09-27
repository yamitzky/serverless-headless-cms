import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { theme } from '~/theme'
import { AppContext, useApp } from '~/hooks/app'
import { AuthContext, useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import { I18n } from '~/hooks/i18n'

function App({ Component, pageProps }: AppProps): React.ReactNode {
  const router = useRouter()
  const id = router.query.id as string

  const authCtx = useAuth()
  const appCtx = useApp(id)

  return (
    <I18n locale={pageProps.lng}>
      <AuthContext.Provider value={authCtx}>
        <AppContext.Provider value={appCtx}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppContext.Provider>
      </AuthContext.Provider>
    </I18n>
  )
}
export default App
