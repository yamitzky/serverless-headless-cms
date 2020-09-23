import { useCallback } from 'react'
import {
  useCollection,
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
import { useAuth } from '~/hooks/auth'

// TODO: richtext, number, date, datetime, select, boolean, etc...
export const fieldTypes = ['text', 'longtext'] as const
export type FieldType = typeof fieldTypes[number]
export const fieldTypeLabel: Record<FieldType, string> = {
  text: 'テキスト',
  longtext: 'テキスト(長文)'
}

export type Field = {
  name: string
  type: FieldType
}

export type ResourceSchema = {
  name: string
  labelField?: string
  fieldOrder: string[]
  fields: Record<string, Field>
}

type App = {
  id: string
  name: string
  schemaOrder: string[]
  schema: Record<string, ResourceSchema>
}

type Error = {
  message: string
}

type Context = {
  loading: boolean
  error: Error | undefined
}

type AppActions = {
  addResource: (
    id: string,
    rid: string,
    schema: ResourceSchema
  ) => Promise<void>
  addField: (
    id: string,
    rid: string,
    fid: string,
    field: Field
  ) => Promise<void>
  updateResource: (
    id: string,
    rid: string,
    schema: ResourceSchema
  ) => Promise<void>
  updateField: (
    id: string,
    rid: string,
    fid: string,
    field: Field
  ) => Promise<void>
  deleteResource: (id: string, rid: string) => Promise<void>
  deleteField: (id: string, rid: string, fid: string) => Promise<void>
}

export function useAppActions(): AppActions {
  const addResource = useCallback(
    async (id: string, rid: string, schema: ResourceSchema) => {
      await firebase
        .firestore()
        .collection('applications')
        .doc(id)
        .update({
          [`schema.${rid}`]: {
            ...schema,
            name: schema.name || rid,
            fieldOrder: [],
            fields: {}
          },
          [`schemaOrder`]: firebase.firestore.FieldValue.arrayUnion(rid)
        })
    },
    []
  )
  const addField = useCallback(
    async (id: string, rid: string, fid: string, field: Field) => {
      await firebase
        .firestore()
        .collection('applications')
        .doc(id)
        .update({
          [`schema.${rid}.fields.${fid}`]: {
            ...field,
            name: field.name || fid
          },
          [`schema.${rid}.fieldOrder`]: firebase.firestore.FieldValue.arrayUnion(
            fid
          )
        })
    },
    []
  )
  const updateResource = useCallback(
    async (id: string, rid: string, _schema: ResourceSchema) => {
      const schema = {
        ..._schema,
        name: _schema.name || rid
      }
      const upd: Record<string, any> = {}
      for (const key of Object.keys(schema)) {
        upd[`schema.${rid}.${key}`] = schema[key as keyof ResourceSchema]
      }
      await firebase.firestore().collection('applications').doc(id).update(upd)
    },
    []
  )
  const updateField = useCallback(
    async (id: string, rid: string, fid: string, field: Field) => {
      await firebase
        .firestore()
        .collection('applications')
        .doc(id)
        .update({
          [`schema.${rid}.fields.${fid}`]: {
            ...field,
            name: field.name || fid
          }
        })
    },
    []
  )
  const deleteResource = useCallback(async (id: string, rid: string) => {
    await firebase
      .firestore()
      .collection('applications')
      .doc(id)
      .update({
        [`schema.${rid}`]: undefined,
        [`schemaOrder`]: firebase.firestore.FieldValue.arrayRemove(rid)
      })
  }, [])
  const deleteField = useCallback(
    async (id: string, rid: string, fid: string) => {
      await firebase
        .firestore()
        .collection('applications')
        .doc(id)
        .update({
          [`schema.${rid}.fields.${fid}`]: undefined,
          [`schema.${rid}.fieldOrder`]: firebase.firestore.FieldValue.arrayRemove(
            fid
          )
        })
    },
    []
  )

  return {
    addResource,
    addField,
    updateResource,
    updateField,
    deleteResource,
    deleteField
  }
}

export function useApps(): Context & { apps: App[] } {
  const { user, loading: uloading, error: uerror } = useAuth()
  const uid = user?.uid
  const [myApps, myloading, myerror] = useCollection(
    uid
      ? firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('applications')
      : null
  )

  const appIds = myApps?.docs.map((doc) => doc.id) || []
  const [apps, loading, error] = useCollectionData<App>(
    appIds.length
      ? firebase
          .firestore()
          .collection('applications')
          .where(firebase.firestore.FieldPath.documentId(), 'in', appIds)
      : null,
    {
      idField: 'id'
    }
  )

  return {
    apps: apps || [],
    loading: loading || uloading || myloading,
    error: uerror || myerror || error
  }
}

export function useApp(id: string): Context & { app?: App } {
  const [app, loading, error] = useDocumentData<App>(
    id ? firebase.firestore().collection('applications').doc(id) : null,
    { idField: 'id' }
  )

  return {
    app,
    loading,
    error
  }
}

export const visibilities = ['private', 'public'] as const
export type Visibility = typeof visibilities[number]
export const visibilityLabel: Record<Visibility, string> = {
  public: '公開',
  private: '非公開'
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
      ? firebase.firestore().collection('applications').doc(id).collection(rid)
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
