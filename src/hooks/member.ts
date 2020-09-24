import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { firebase } from '~/firebase'

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
  const [member, loading, error] = useDocumentData<Member>(
    id && uid
      ? firebase
          .firestore()
          .collection('memberships')
          .doc(id)
          .collection('users')
          .doc(uid)
      : null,
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
  const add = useCallback(
    async (id: string, uid: string, mem: Omit<Member, 'id'>) => {
      await firebase
        .firestore()
        .collection('memberships')
        .doc(id)
        .collection('users')
        .doc(uid)
        .set({
          ...mem,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
      await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('applications')
        .doc(id)
        .set({
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
    },
    []
  )
  const update = useCallback(async (id: string, uid: string, mem: Member) => {
    await firebase
      .firestore()
      .collection('memberships')
      .doc(id)
      .collection('users')
      .doc(uid)
      .update(mem)
  }, [])
  const remove = useCallback(async (id: string, uid: string) => {
    await firebase
      .firestore()
      .collection('memberships')
      .doc(id)
      .collection('users')
      .doc(uid)
      .delete()
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('applications')
      .doc(id)
      .delete()
  }, [])

  return {
    add,
    update,
    remove
  }
}

export function useMembers(id: string): Context & { members: Member[] } {
  const [members, loading, error] = useCollectionData<Member>(
    id
      ? firebase
          .firestore()
          .collection('memberships')
          .doc(id)
          .collection('users')
          .orderBy('created', 'desc')
      : null,
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
