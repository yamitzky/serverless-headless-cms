import { useCallback } from 'react'
import { FileHooks } from '~/hooks/file'
import { firebase } from '~/firebase'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { useAuthContext } from '~/hooks/auth'

export const useFileActions: FileHooks['useFileActions'] = () => {
  const { user } = useAuthContext()
  const upload = useCallback(
    async (file: File) => {
      const ref = firebase.storage().ref()
      const date = format(new Date(), 'yyyy/MM/dd')
      const put = await ref
        .child(`cms-upload/${date}/${uuidv4()}`)
        .put(file, { customMetadata: { owner: user?.uid || '' } })
      return await put.ref.getDownloadURL()
    },
    [user]
  )
  return { upload }
}
