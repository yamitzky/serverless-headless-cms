import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
import { Resource, ResourceHooks } from '~/hooks/resource'
import { useResourceSelectors } from '~/hooks/resource-selector'

export const useResource: ResourceHooks['useResource'] = (
  id: string,
  rid: string,
  iid: string
) => {
  const { getResource } = useResourceSelectors()
  const [resource, loading, error] = useDocumentData<Resource>(
    id && rid && iid ? getResource(id, rid, iid) : null,
    {
      idField: 'id'
    }
  )
  return {
    resource,
    loading,
    error
  }
}

export const useResourceActions: ResourceHooks['useResourceActions'] = () => {
  const { getResource, getResources } = useResourceSelectors()
  const fetch = useCallback(
    async (id: string, rid: string, iid: string) => {
      const doc = await getResource(id, rid, iid).get()
      return { ...doc.data(), id: doc.id } as Resource
    },
    [getResource]
  )
  const fetchAll = useCallback(
    async (id: string, rid: string) => {
      const ref = await getResources(id, rid).orderBy('published', 'desc').get()
      return ref.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Resource))
    },
    [getResources]
  )
  const add = useCallback(
    async (id: string, rid: string, res: Resource) => {
      await getResources(id, rid)
        .doc()
        .set({
          ...res,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          published: firebase.firestore.FieldValue.serverTimestamp(), // FIXME
          updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    [getResources]
  )
  const update = useCallback(
    async (id: string, rid: string, iid: string, res: Resource) => {
      await getResource(id, rid, iid).update({
        ...res,
        updated: firebase.firestore.FieldValue.serverTimestamp()
      })
    },
    [getResource]
  )

  return {
    fetch,
    fetchAll,
    add,
    update
  }
}

export const useResources: ResourceHooks['useResources'] = (
  id: string,
  rid: string
) => {
  const { getResources } = useResourceSelectors()
  const [resources, loading, error] = useCollectionData<Resource>(
    id && rid ? getResources(id, rid).orderBy('published', 'desc') : null,
    {
      idField: 'id'
    }
  )
  return {
    resources: resources || [],
    loading,
    error
  }
}
