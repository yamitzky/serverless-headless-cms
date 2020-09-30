import React, { useContext } from 'react'

type Error = {
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

export type AuthHooks = {
  useAuth(): AuthContext
  useAuthActions(): AuthActions
}
export const AuthHooksContext = React.createContext<AuthHooks>(null as any)

export function useAuth(): AuthContext {
  return useContext(AuthHooksContext).useAuth()
}

export const AuthContext = React.createContext<AuthContext>({
  loading: true
})
export function useAuthContext(): AuthContext {
  return useContext(AuthContext)
}

type AuthActions = {
  logout: () => Promise<void>
}

export function useAuthActions(): AuthActions {
  return useContext(AuthHooksContext).useAuthActions()
}
