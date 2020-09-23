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
  user: User | undefined
  loading: boolean
  error: Error | undefined
}

export function useAuth(): AuthContext {
  const [user, loading, error] = useAuthState(firebase.auth())

  return {
    user,
    loading,
    error
  }
}
