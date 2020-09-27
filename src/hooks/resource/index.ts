import React, { useContext } from 'react'
export const visibilities = ['private', 'public'] as const
export type Visibility = typeof visibilities[number]

type Context = {
  loading: boolean
  error: Error | undefined
}

export type ResourceHooks = {
  useResource(
    id: string,
    rid: string,
    iid: string
  ): Context & { resource?: Resource }
  useResourceActions(): ResourceActions
  useResources(id: string, rid: string): Context & { resources: Resource[] }
}
export const ResourceHooksContext = React.createContext<ResourceHooks>(
  null as any
)

export function useResource(
  id: string,
  rid: string,
  iid: string
): Context & { resource?: Resource } {
  return useContext(ResourceHooksContext).useResource(id, rid, iid)
}

type ResourceActions = {
  fetch: (id: string, rid: string, iid: string) => Promise<Resource>
  fetchAll: (id: string, rid: string) => Promise<Resource[]>
  add: (id: string, rid: string, res: Resource) => Promise<void>
  update: (id: string, rid: string, iid: string, res: Resource) => Promise<void>
}

export function useResourceActions(): ResourceActions {
  return useContext(ResourceHooksContext).useResourceActions()
}

export type Resource = {
  id: string
  visibility: Visibility
} & Record<string, any>

export function useResources(
  id: string,
  rid: string
): Context & { resources: Resource[] } {
  return useContext(ResourceHooksContext).useResources(id, rid)
}
