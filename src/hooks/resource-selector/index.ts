import React, { useContext } from 'react'
import { firebase } from '~/firebase'

export type ResourceSelectors = {
  getResources: (
    id: string,
    rid: string,
    order?: string
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  getResource: (
    id: string,
    rid: string,
    iid: string
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
}

export type ResourceSelectorsContext = {
  useResourceSelectors(): ResourceSelectors
}
export const ResourceSelectorsContext = React.createContext<
  ResourceSelectorsContext
>(null as any)
export function useResourceSelectors(): ResourceSelectors {
  return useContext(ResourceSelectorsContext).useResourceSelectors()
}
