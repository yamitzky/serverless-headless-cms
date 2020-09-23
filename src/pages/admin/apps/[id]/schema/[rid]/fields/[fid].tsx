import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { FieldForm } from '~/components/organisms/FieldForm'

const AdminFieldEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const fid = router.query.fid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { updateField } = useAppActions()
  const toast = useToast()

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム',
          href: `/admin/apps/${id}`
        },
        {
          title: 'スキーマ管理'
        },
        {
          title: schema?.name || '',
          href: `/admin/apps/${id}/schema/${rid}`
        },
        {
          title: schema?.fields[fid].name || ''
        }
      ]}
    >
      <Section title={fid}>
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
