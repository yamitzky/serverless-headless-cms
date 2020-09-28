import { useCallback } from 'react'
import {
  useCollection,
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { config } from '~/config'
import { firebase } from '~/firebase'
import { App, AppHooks, Field, ResourceSchema } from '~/hooks/app'
import { useAppSelectors } from '~/hooks/app-selector'
import { useAuthContext } from '~/hooks/auth'
import { useI18n } from '~/hooks/i18n'

export const useAppActions: AppHooks['useAppActions'] = () => {
  const { getApp, getApps, getUserApp } = useAppSelectors()
  const { t } = useI18n()
  const { user } = useAuthContext()
  const add = useCallback(
    async (app: App) => {
      const { id } = await getApps().add({
        ...app,
        [config.createdField]: firebase.firestore.FieldValue.serverTimestamp(),
        schemaOrder: config.disableAppDefault ? [] : ['articles'],
        schema: config.disableAppDefault
          ? {}
          : {
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
        [config.createdField]: firebase.firestore.FieldValue.serverTimestamp()
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

export const useApps: AppHooks['useApps'] = (uid?: string) => {
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

export const useApp: AppHooks['useApp'] = (id: string) => {
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
