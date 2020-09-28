import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from '~/firebase'
import { AuthHooks } from '~/hooks/auth'

export const useAuth: AuthHooks['useAuth'] = () => {
  const [user, loading, error] = useAuthState(firebase.auth())

  return {
    user,
    loading,
    error
  }
}

export const useAuthActions: AuthHooks['useAuthActions'] = () => {
  const logout = useCallback(async () => {
    await firebase.auth().signOut()
  }, [])
  return { logout }
}
