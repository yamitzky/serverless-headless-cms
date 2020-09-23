import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Skeleton, useToast } from '@chakra-ui/core'
import { FieldForm } from '~/components/organisms/FieldForm'

const AdminFieldEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useApp(
    router.query.id as string
  )
  const rid = router.query.rid as string
  const fid = router.query.fid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { updateField } = useAppActions()
  const toast = useToast()

  return (
    <AdminTemplate sidebar={<Sidebar />}>
      <Section title={<Skeleton isLoaded={!appLoading}>{fid}</Skeleton>}>
        {schema && (
          <FieldForm
            values={schema.fields[fid]}
            onSubmit={async (f) => {
              await updateField(id, rid, fid, f)
              toast({
                title: '保存しました',
                status: 'success',
                duration: 2000
              })
            }}
          />
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminFieldEditPage
