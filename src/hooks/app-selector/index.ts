import React, { useCallback, useContext } from 'react'
import { firebase } from '~/firebase'

export type AppSelectors = {
  getApps: () => firebase.firestore.CollectionReference<
    firebase.firestore.DocumentData
  >
  getApp: (
    id: string
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  getUserApp: (
    id: string,
    uid: string
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  getUserApps: (
    uid: string
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  getAppsByIds: (
    appIds: string[]
  ) => firebase.firestore.Query<firebase.firestore.DocumentData>
  getMembership: (
    id: string,
    uid: string
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  getMemberships: (
    id: string
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
}

export type AppSelectorsContext = {
  useAppSelectors: () => AppSelectors
}
export const AppSelectorsContext = React.createContext<AppSelectorsContext>(
  null as any
)
export function useAppSelectors(): AppSelectors {
  return useContext(AppSelectorsContext).useAppSelectors()
}
