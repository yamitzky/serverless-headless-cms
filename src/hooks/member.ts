import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'
import { useAppSelectors } from '~/hooks/app-selector'

export type Member = {
  id: string
  name: string
}

type Context = {
  loading: boolean
  error: Error | undefined
}

export function useMember(
  id: string,
  uid: string
): Context & { member?: Member } {
  const { getMembership } = useAppSelectors()
  const [member, loading, error] = useDocumentData<Member>(
    id && uid ? getMembership(id, uid) : null,
    {
      idField: 'id'
    }
  )
  return {
    member,
    loading,
    error
  }
}

type MemberActions = {
  add: (
    id: string,
    uid: string,
    membership: Omit<Member, 'id'>
  ) => Promise<void>
  update: (id: string, uid: string, membership: Member) => Promise<void>
  remove: (id: string, uid: string) => Promise<void>
}

export function useMemberActions(): MemberActions {
  const { getUserApp, getMembership } = useAppSelectors()
  const add = useCallback(
    async (id: string, uid: string, mem: Omit<Member, 'id'>) => {
      await getMembership(id, uid).set({
        ...mem,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      await getUserApp(id, uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    },
    [getMembership, getUserApp]
  )
  const update = useCallback(
    async (id: string, uid: string, mem: Member) => {
      await getMembership(id, uid).update(mem)
    },
    [getMembership]
  )
  const remove = useCallback(
    async (id: string, uid: string) => {
      await getMembership(id, uid).delete()
      await getUserApp(id, uid).delete()
    },
    [getMembership, getUserApp]
  )

  return {
    add,
    update,
    remove
  }
}

export function useMembers(id: string): Context & { members: Member[] } {
  const { getMemberships } = useAppSelectors()
  const [members, loading, error] = useCollectionData<Member>(
    id ? getMemberships(id).orderBy('created', 'desc') : null,
    {
      idField: 'id'
    }
  )
  return {
    members: members || [],
    loading,
    error
  }
}
