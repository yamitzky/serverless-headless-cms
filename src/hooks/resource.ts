import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
export const visibilities = ['private', 'public'] as const
export type Visibility = typeof visibilities[number]
export const visibilityLabel: Record<Visibility, string> = {
  public: '公開',
  private: '非公開'
}

type Context = {
  loading: boolean
  error: Error | undefined
}

export function useResource(
  id: string,
  rid: string,
  iid: string
): Context & { resource?: Resource } {
  const [resource, loading, error] = useDocumentData<Resource>(
    id && rid && iid
      ? firebase
          .firestore()
          .collection('applications')
          .doc(id)
          .collection(rid)
          .doc(iid)
      : null,
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
  add: (id: string, rid: string, res: Resource) => Promise<void>
  update: (id: string, rid: string, iid: string, res: Resource) => Promise<void>
}

export function useResourceActions(): ResourceActions {
  const add = useCallback(async (id: string, rid: string, res: Resource) => {
    await firebase
      .firestore()
      .collection('applications')
      .doc(id)
      .collection(rid)
      .doc()
      .set({
        ...res,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        published: firebase.firestore.FieldValue.serverTimestamp(), // FIXME
        updated: firebase.firestore.FieldValue.serverTimestamp()
      })
  }, [])
  const update = useCallback(
    async (id: string, rid: string, iid: string, res: Resource) => {
      await firebase
        .firestore()
        .collection('applications')
        .doc(id)
        .collection(rid)
        .doc(iid)
        .update({
          ...res,
          updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    []
  )

  return {
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
  const [resources, loading, error] = useCollectionData<Resource>(
    id && rid
      ? firebase
          .firestore()
          .collection('applications')
          .doc(id)
          .collection(rid)
          .orderBy('published', 'desc')
      : null,
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
