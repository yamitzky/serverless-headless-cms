/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import { theme } from '~/theme'
import { AppContext, AppHooksContext, useApp } from '~/hooks/app'
import { AuthContext, useAuth } from '~/hooks/auth'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css'
import { I18n } from '~/hooks/i18n'
import { AppSelectorsContext } from '~/hooks/app-selector'
import { AuthHooksContext } from '~/hooks/auth'
import { MemberHooksContext } from '~/hooks/member'
import { ResourceHooksContext } from '~/hooks/resource'
import { ResourceSelectorsContext } from '~/hooks/resource-selector'
import * as authHooks from '~/hooks/auth/firebase'
import * as memberHooks from '~/hooks/member/firebase'
import * as resourceHooks from '~/hooks/resource/firebase'
import * as resourceSelectors from '~/hooks/resource-selector/firebase'
import * as appHooks from '~/hooks/app/firebase'
import * as appSelectors from '~/hooks/app-selector/firebase'
import * as fileHooks from '~/hooks/file/firebase'
import { FileHooksContext } from '~/hooks/file'
const plugins = require('@plugins')

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
      <FileHooksContext.Provider
        value={{ ...fileHooks, ...plugins?.fileHooks }}
      >
        <ResourceSelectorsContext.Provider
          value={{ ...resourceSelectors, ...plugins?.resourceSelectors }}
        >
          <ResourceHooksContext.Provider
            value={{ ...resourceHooks, ...plugins?.resourceHooks }}
          >
            <MemberHooksContext.Provider
              value={{ ...memberHooks, ...plugins?.memberHooks }}
            >
              <AuthHooksContext.Provider
                value={{ ...authHooks, ...plugins?.authHooks }}
              >
                <AppSelectorsContext.Provider
                  value={{ ...appSelectors, ...plugins?.appSelectors }}
                >
                  <AppHooksContext.Provider
                    value={{ ...appHooks, ...plugins?.appHooks }}
                  >
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
      </FileHooksContext.Provider>
    </I18n>
  )
}
export default App
