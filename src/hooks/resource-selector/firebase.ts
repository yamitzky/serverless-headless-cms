import { useCallback } from 'react'
import { firebase } from '~/firebase'
import { ResourceSelectors } from '~/hooks/resource-selector'

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
