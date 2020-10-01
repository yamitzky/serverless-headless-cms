import React, { useContext } from 'react'

export type FileHooks = {
  useFileActions(): FileActions
}
export const FileHooksContext = React.createContext<FileHooks>(null as any)

type FileActions = {
  upload: (file: File) => Promise<string>
}

export function useFileActions(): FileActions {
  return useContext(FileHooksContext).useFileActions()
}
