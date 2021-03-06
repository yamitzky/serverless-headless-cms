import React, { useContext } from 'react'
import { Order } from '~/hooks/resource-selector'

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
  useResources(
    id: string,
    rid: string,
    sort?: [string, Order]
  ): Context & { resources: Resource[] }
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
  remove: (id: string, rid: string, iid: string) => Promise<void>
}

export function useResourceActions(): ResourceActions {
  return useContext(ResourceHooksContext).useResourceActions()
}

export type Resource = {
  id: string
} & Record<string, any>

export function useResources(
  id: string,
  rid: string,
  sort: [string, Order]
): Context & { resources: Resource[] } {
  return useContext(ResourceHooksContext).useResources(id, rid, sort)
}
