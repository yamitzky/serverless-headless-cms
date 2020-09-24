import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { FieldForm } from '~/components/organisms/FieldForm'

const AdminFieldNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { addField } = useAppActions()
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
          title: 'フィールド作成'
        }
      ]}
    >
      <Section title="フィールドを作成">
        {schema && app && (
          <FieldForm
            isNew
            currentIds={schema?.fieldOrder}
            allSchema={app.schemaOrder.map((s) => ({
              ...app.schema[s],
              id: s
            }))}
            onSubmit={async (_f) => {
              const { id: fid, ...f } = _f
              await addField(id, rid, fid!, f)
              toast({
                title: 'フィールドを作成しました',
                status: 'success',
                duration: 2000
              })
              router.push(`/admin/apps/${id}/schema/${rid}`)
            }}
          />
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminFieldNewPage
