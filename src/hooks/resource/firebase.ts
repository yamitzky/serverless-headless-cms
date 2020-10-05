import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { config } from '~/config'
import { firebase } from '~/firebase'
import { useAuthContext } from '~/hooks/auth'
import { Resource, ResourceHooks } from '~/hooks/resource'
import { Order, useResourceSelectors } from '~/hooks/resource-selector'

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
  const {
    getResource,
    getResources,
    getSortedResources
  } = useResourceSelectors()
  const fetch = useCallback(
    async (id: string, rid: string, iid: string) => {
      const doc = await getResource(id, rid, iid).get()
      return { ...doc.data(), id: doc.id } as Resource
    },
    [getResource]
  )
  const fetchAll = useCallback(
    async (id: string, rid: string) => {
      const ref = await getSortedResources(id, rid, [
        config.createdField,
        'desc'
      ]).get()
      return ref.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Resource))
    },
    [getSortedResources]
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
  const remove = useCallback(
    async (id: string, rid: string, iid: string) => {
      await getResource(id, rid, iid).delete()
    },
    [getResource]
  )

  return {
    fetch,
    fetchAll,
    add,
    update,
    remove
  }
}

export const useResources: ResourceHooks['useResources'] = (
  id: string,
  rid: string,
  sort?: [string, Order]
) => {
  const { getResources, getSortedResources } = useResourceSelectors()
  const [resources, loading, error] = useCollectionData<Resource>(
    id && rid
      ? sort
        ? getSortedResources(id, rid, sort)
        : getResources(id, rid)
      : null,
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
