import { useCallback } from 'react'
import { firebase } from '~/firebase'

export type ResourceSelectors = {
  getResources: (
    id: string,
    rid: string
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  getResource: (
    id: string,
    rid: string,
    iid: string
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export function useResourceSelectors(): ResourceSelectors {
  const getResources = useCallback(
    (id: string, rid: string) =>
      firebase.firestore().collection('applications').doc(id).collection(rid),
    []
  )
  const getResource = useCallback(
    (id: string, rid: string, iid: string) => getResources(id, rid).doc(iid),
    [getResources]
  )
  return {
    getResources,
    getResource
  }
}
