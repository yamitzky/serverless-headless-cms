import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from '~/firebase'

type Error = {
  code: string
  message: string
}

type User = {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}

type AuthContext = {
  user?: User
  loading: boolean
  error?: Error
}

export function useAuth(): AuthContext {
  const [user, loading, error] = useAuthState(firebase.auth())

  return {
    user,
    loading,
    error
  }
}

export const AuthContext = React.createContext<AuthContext>({
  loading: true
})
export function useAuthContext(): AuthContext {
  return useContext(AuthContext)
}
