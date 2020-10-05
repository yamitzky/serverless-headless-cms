import { useCallback } from 'react'
import { firebase } from '~/firebase'
import { Order, ResourceSelectors } from '~/hooks/resource-selector'
import templite from 'templite'
import { config } from '~/config'

export function useResourceSelectors(): ResourceSelectors {
  const getResources = useCallback(
    (id: string, rid: string) =>
      firebase
        .firestore()
        .collection(templite(config.resourcesPath, { id, rid })),
    []
  )
  const getSortedResources = useCallback(
    (id: string, rid: string, sort: [string, Order]) =>
      getResources(id, rid).orderBy(sort[0], sort[1]),
    [getResources]
  )
  const getResource = useCallback(
    (id: string, rid: string, iid: string) =>
      firebase.firestore().doc(templite(config.resourcePath, { id, rid, iid })),
    []
  )
  return {
    getResources,
    getSortedResources,
    getResource
  }
}
