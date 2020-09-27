import React, { useCallback, useContext } from 'react'
import {
  useCollection,
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
import { useAppSelectors } from '~/hooks/app-selector'
import { useAuthContext } from '~/hooks/auth'
import { useI18n } from '~/hooks/i18n'

// TODO: richtext, number, date, datetime, select, boolean, etc...
export const fieldTypes = [
  'text',
  'longtext',
  'richtext',
  'reference',
  'number'
] as const
export type FieldType = typeof fieldTypes[number]

export type Field = {
  name: string
  type: FieldType

  description?: string
  required?: boolean
  pattern?: string

  // for reference
  referTo?: string

  // for number
  max?: number
  min?: number
}

export type ResourceSchema = {
  name: string
  fieldOrder: string[]
  fields: Record<string, Field>
}

export type App = {
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
  error?: Error
}

type AppActions = {
  add: (app: App) => Promise<string>
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
  removeResource: (id: string, rid: string) => Promise<void>
  removeField: (id: string, rid: string, fid: string) => Promise<void>
}

export function useAppActions(): AppActions {
  const { getApp, getApps, getUserApp } = useAppSelectors()
  const { t } = useI18n()
  const { user } = useAuthContext()
  const add = useCallback(
    async (app: App) => {
      const { id } = await getApps().add({
        ...app,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        schemaOrder: ['articles'],
        schema: {
          articles: {
            name: t('article'),
            fieldOrder: ['title', 'body'],
            fields: {
              title: {
                name: t('title'),
                type: 'text',
                required: true
              },
              body: {
                name: t('body'),
                type: 'richtext'
              }
            }
          }
        },
        owner: user?.uid
      } as App)
      await getUserApp(id, user!.uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      return id
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, getApps, getUserApp]
  )
  const addResource = useCallback(
    async (id: string, rid: string, schema: ResourceSchema) => {
      await getApp(id).update({
        [`schema.${rid}`]: {
          ...schema,
          name: schema.name || rid,
          fieldOrder: [],
          fields: {}
        },
        [`schemaOrder`]: firebase.firestore.FieldValue.arrayUnion(rid)
      })
    },
    [getApp]
  )
  const addField = useCallback(
    async (id: string, rid: string, fid: string, field: Field) => {
      await getApp(id).update({
        [`schema.${rid}.fields.${fid}`]: {
          ...field,
          name: field.name || fid
        },
        [`schema.${rid}.fieldOrder`]: firebase.firestore.FieldValue.arrayUnion(
          fid
        )
      })
    },
    [getApp]
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
      await getApp(id).update(upd)
    },
    [getApp]
  )
  const updateField = useCallback(
    async (id: string, rid: string, fid: string, field: Field) => {
      await getApp(id).update({
        [`schema.${rid}.fields.${fid}`]: {
          ...field,
          name: field.name || fid
        }
      })
    },
    [getApp]
  )
  const removeResource = useCallback(
    async (id: string, rid: string) => {
      await getApp(id).update({
        [`schema.${rid}`]: null,
        [`schemaOrder`]: firebase.firestore.FieldValue.arrayRemove(rid)
      })
    },
    [getApp]
  )
  const removeField = useCallback(
    async (id: string, rid: string, fid: string) => {
      await getApp(id).update({
        [`schema.${rid}.fields.${fid}`]: null,
        [`schema.${rid}.fieldOrder`]: firebase.firestore.FieldValue.arrayRemove(
          fid
        )
      })
    },
    [getApp]
  )

  return {
    add,
    addResource,
    addField,
    updateResource,
    updateField,
    removeResource,
    removeField
  }
}

export function useApps(uid?: string): Context & { apps: App[] } {
  const { getUserApps, getAppsByIds } = useAppSelectors()
  const [myApps, myloading, myerror] = useCollection(
    uid ? getUserApps(uid) : null
  )

  const appIds = myApps?.docs.map((doc) => doc.id) || []
  const [apps, loading, error] = useCollectionData<App>(
    appIds.length ? getAppsByIds(appIds) : null,
    {
      idField: 'id'
    }
  )

  return {
    apps: apps || [],
    loading: loading || myloading,
    error: myerror || error
  }
}

export function useApp(id: string): Context & { app?: App } {
  const { getApp } = useAppSelectors()
  const [app, loading, error] = useDocumentData<App>(id ? getApp(id) : null, {
    idField: 'id'
  })

  return {
    app,
    loading,
    error
  }
}

export const AppContext = React.createContext<Context & { app?: App }>({
  loading: true
})
export function useAppContext(): Context & { app?: App } {
  return useContext(AppContext)
}
