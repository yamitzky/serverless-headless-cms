import { useCallback } from 'react'
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

export function useAppSelectors(): AppSelectors {
  const getMemberships = useCallback(
    (id: string) =>
      firebase
        .firestore()
        .collection('memberships')
        .doc(id)
        .collection('users'),
    []
  )
  const getMembership = useCallback(
    (id: string, uid: string) => getMemberships(id).doc(uid),
    [getMemberships]
  )
  const getApps = useCallback(
    () => firebase.firestore().collection('applications'),
    []
  )
  const getApp = useCallback((id: string) => getApps().doc(id), [getApps])
  const getUserApps = useCallback(
    (uid: string) =>
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('applications'),
    []
  )
  const getUserApp = useCallback(
    (id: string, uid: string) => getUserApps(uid).doc(id),
    [getUserApps]
  )
  const getAppsByIds = useCallback(
    (appIds: string[]) =>
      getApps().where(firebase.firestore.FieldPath.documentId(), 'in', appIds),
    [getApps]
  )

  return {
    getApps,
    getApp,
    getUserApp,
    getUserApps,
    getAppsByIds,
    getMembership,
    getMemberships
  }
}
