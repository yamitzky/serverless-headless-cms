import React, { useContext } from 'react'

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

export type AppActions = {
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

export type AppHooks = {
  useAppActions: () => AppActions
  useApps: (uid?: string) => Context & { apps: App[] }
  useApp: (id: string) => Context & { app?: App }
}
export const AppHooksContext = React.createContext<AppHooks>(null as any)
export function useAppActions(): AppActions {
  return useContext(AppHooksContext).useAppActions()
}
export function useApps(uid?: string): Context & { apps: App[] } {
  return useContext(AppHooksContext).useApps(uid)
}
export function useApp(id: string): Context & { app?: App } {
  return useContext(AppHooksContext).useApp(id)
}

export const AppContext = React.createContext<Context & { app?: App }>({
  loading: true
})
export function useAppContext(): Context & { app?: App } {
  return useContext(AppContext)
}
