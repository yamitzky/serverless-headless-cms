import { useCallback } from 'react'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { config } from '~/config'
import { firebase } from '~/firebase'
import { useAppSelectors } from '~/hooks/app-selector'
import { Member, MemberHooks } from '~/hooks/member'

export const useMember: MemberHooks['useMember'] = (
  id: string,
  uid: string
) => {
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

export const useMemberActions: MemberHooks['useMemberActions'] = () => {
  const { getUserApp, getMembership } = useAppSelectors()
  const add = useCallback(
    async (id: string, uid: string, mem: Omit<Member, 'id'>) => {
      await getMembership(id, uid).set({
        ...mem,
        [config.createdField]: firebase.firestore.FieldValue.serverTimestamp()
      })
      await getUserApp(id, uid).set({
        [config.createdField]: firebase.firestore.FieldValue.serverTimestamp()
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

export const useMembers: MemberHooks['useMembers'] = (id: string) => {
  const { getMemberships } = useAppSelectors()
  const [members, loading, error] = useCollectionData<Member>(
    id ? getMemberships(id).orderBy(config.createdField, 'desc') : null,
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
