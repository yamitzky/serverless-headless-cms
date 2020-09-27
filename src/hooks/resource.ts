import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
import { useResourceSelectors } from '~/hooks/resource-selector'
export const visibilities = ['private', 'public'] as const
export type Visibility = typeof visibilities[number]

type Context = {
  loading: boolean
  error: Error | undefined
}

export function useResource(
  id: string,
  rid: string,
  iid: string
): Context & { resource?: Resource } {
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

type ResourceActions = {
  fetch: (id: string, rid: string, iid: string) => Promise<Resource>
  fetchAll: (id: string, rid: string) => Promise<Resource[]>
  add: (id: string, rid: string, res: Resource) => Promise<void>
  update: (id: string, rid: string, iid: string, res: Resource) => Promise<void>
}

export function useResourceActions(): ResourceActions {
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

export type Resource = {
  id: string
  visibility: Visibility
} & Record<string, any>

export function useResources(
  id: string,
  rid: string
): Context & { resources: Resource[] } {
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
