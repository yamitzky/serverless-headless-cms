import { useCallback, useEffect, useState } from 'react'
import { AuthHooks } from '~/hooks/auth'
import { Auth, Hub } from 'aws-amplify'
import { HubCapsule } from '@aws-amplify/core'

export const useAuth: AuthHooks['useAuth'] = () => {
  const [auth, setAuthState] = useState<{
    user?: any
    customState?: any
    loaded?: boolean
    error?: Error
  }>()

  const hubCallback = useCallback(
    ({ payload: { event, data } }: HubCapsule) => {
      switch (event) {
        case 'signIn':
          setAuthState({ user: data, loaded: true })
          break
        case 'signOut':
          setAuthState({ user: undefined, loaded: true })
          break
        case 'customOAuthState':
          setAuthState({ customState: data, loaded: true })
      }
    },
    []
  )

  useEffect(() => {
    Hub.listen('auth', hubCallback)
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setAuthState({ user, loaded: true })
      })
      .catch((error) => setAuthState({ error, loaded: true }))
    return () => {
      Hub.remove('auth', hubCallback)
    }
  }, [hubCallback])

  return {
    user: auth?.user
      ? {
          uid: auth.user.username,
          displayName: auth.user.attributes?.name,
          email: auth.user.attributes?.email,
          photoURL: auth.user.attributes?.picture
        }
      : undefined,
    loading: !auth,
    error: auth?.error
  }
}

export const useAuthActions: AuthHooks['useAuthActions'] = () => {
  const logout = useCallback(async () => {
    await Auth.signOut()
  }, [])
  return { logout }
}
