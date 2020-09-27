import React, { useContext } from 'react'

export type Member = {
  id: string
  name: string
}

type Context = {
  loading: boolean
  error: Error | undefined
}

export type MemberHooks = {
  useMember(id: string, uid: string): Context & { member?: Member }
  useMemberActions(): MemberActions
  useMembers(id: string): Context & { members: Member[] }
}
export const MemberHooksContext = React.createContext<MemberHooks>(null as any)

export function useMember(
  id: string,
  uid: string
): Context & { member?: Member } {
  return useContext(MemberHooksContext).useMember(id, uid)
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
  return useContext(MemberHooksContext).useMemberActions()
}

export function useMembers(id: string): Context & { members: Member[] } {
  return useContext(MemberHooksContext).useMembers(id)
}
