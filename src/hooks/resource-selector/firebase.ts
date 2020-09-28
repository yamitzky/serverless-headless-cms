import { useCallback } from 'react'
import { firebase } from '~/firebase'
import { ResourceSelectors } from '~/hooks/resource-selector'
import templite from 'templite'
import { config } from '~/config'

export function useResourceSelectors(): ResourceSelectors {
  const getResources = useCallback(
    (id: string, rid: string, order?: string) => {
      const coll = firebase
        .firestore()
        .collection(templite(config.resourcesPath, { id, rid }))
      if (order) {
        coll.orderBy(order, 'desc')
      }
      return coll
    },
    []
  )
  const getResource = useCallback(
    (id: string, rid: string, iid: string) =>
      firebase.firestore().doc(templite(config.resourcePath, { id, rid, iid })),
    []
  )
  return {
    getResources,
    getResource
  }
}
