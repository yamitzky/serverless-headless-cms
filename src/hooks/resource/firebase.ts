import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { config } from '~/config'
import { firebase } from '~/firebase'
import { useAuthContext } from '~/hooks/auth'
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
    resource: resource
      ? {
          ...resource,
          [config.createdField]: resource[config.createdField]?.toDate(),
          [config.updatedField]: resource[config.updatedField]?.toDate(),
          [config.publishedField]: resource[config.publishedField]?.toDate()
        }
      : undefined,
    loading,
    error
  }
}

export const useResourceActions: ResourceHooks['useResourceActions'] = () => {
  const { user } = useAuthContext()
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
      const ref = await getResources(id, rid, config.publishedField).get()
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
          [config.createdField]: firebase.firestore.FieldValue.serverTimestamp(),
          [config.createdByField]: user?.uid,
          [config.publishedField]: firebase.firestore.FieldValue.serverTimestamp(), // FIXME
          [config.updatedField]: firebase.firestore.FieldValue.serverTimestamp(),
          [config.updatedByField]: user?.uid
        })
    },
    [getResources, user]
  )
  const update = useCallback(
    async (id: string, rid: string, iid: string, res: Resource) => {
      await getResource(id, rid, iid).update({
        ...res,
        [config.updatedField]: firebase.firestore.FieldValue.serverTimestamp(),
        [config.updatedByField]: user?.uid
      })
    },
    [getResource, user]
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
    id && rid ? getResources(id, rid, config.publishedField) : null,
    {
      idField: 'id'
    }
  )
  return {
    resources:
      resources?.map((r) => ({
        ...r,
        [config.createdField]: r[config.createdField]?.toDate(),
        [config.updatedField]: r[config.updatedField]?.toDate(),
        [config.publishedField]: r[config.publishedField]?.toDate()
      })) || [],
    loading,
    error
  }
}
