import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { theme } from '~/theme'
import { AppContext, AppHooksContext, useApp } from '~/hooks/app'
import { AuthContext, useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import { I18n } from '~/hooks/i18n'
import * as appHooks from '~/hooks/app/firebase'
import * as appSelectors from '~/hooks/app-selector/firebase'
import { AppSelectorsContext } from '~/hooks/app-selector'
import * as authHooks from '~/hooks/auth/firebase'
import { AuthHooksContext } from '~/hooks/auth'
import * as memberHooks from '~/hooks/member/firebase'
import { MemberHooksContext } from '~/hooks/member'
import * as resourceHooks from '~/hooks/resource/firebase'
import { ResourceHooksContext } from '~/hooks/resource'
import * as resourceSelectors from '~/hooks/resource-selector/firebase'
import { ResourceSelectorsContext } from '~/hooks/resource-selector'

const Wrapper: React.FC = ({ children }) => {
  const router = useRouter()
  const id = router.query.id as string

  const authCtx = useAuth()
  const appCtx = useApp(id)

  return (
    <AuthContext.Provider value={authCtx}>
      <AppContext.Provider value={appCtx}>{children}</AppContext.Provider>
    </AuthContext.Provider>
  )
}

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <I18n locale={pageProps.lng}>
      <ResourceSelectorsContext.Provider value={resourceSelectors}>
        <ResourceHooksContext.Provider value={resourceHooks}>
          <MemberHooksContext.Provider value={memberHooks}>
            <AuthHooksContext.Provider value={authHooks}>
              <AppSelectorsContext.Provider value={appSelectors}>
                <AppHooksContext.Provider value={appHooks}>
                  <Wrapper>
                    <ThemeProvider theme={theme}>
                      <CSSReset />
                      <Component {...pageProps} />
                    </ThemeProvider>
                  </Wrapper>
                </AppHooksContext.Provider>
              </AppSelectorsContext.Provider>
            </AuthHooksContext.Provider>
          </MemberHooksContext.Provider>
        </ResourceHooksContext.Provider>
      </ResourceSelectorsContext.Provider>
    </I18n>
  )
}
export default App
