import { useCallback } from 'react'
import { firebase } from '~/firebase'
import { AppSelectors } from '~/hooks/app-selector'
import templite from 'templite'
import { config } from '~/config'

export function useAppSelectors(): AppSelectors {
  const getMemberships = useCallback(
    (id: string) =>
      firebase.firestore().collection(templite(config.membershipsPath, { id })),
    []
  )
  const getMembership = useCallback(
    (id: string, uid: string) =>
      firebase.firestore().doc(templite(config.membershipPath, { id, uid })),
    []
  )
  const getApps = useCallback(
    () => firebase.firestore().collection(config.appsPath),
    []
  )
  const getApp = useCallback(
    (id: string) => firebase.firestore().doc(templite(config.appPath, { id })),
    []
  )
  const getUserApps = useCallback(
    (uid: string) =>
      firebase.firestore().collection(templite(config.userAppsPath, { uid })),
    []
  )
  const getUserApp = useCallback(
    (id: string, uid: string) =>
      firebase.firestore().doc(templite(config.userAppPath, { id, uid })),
    []
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
