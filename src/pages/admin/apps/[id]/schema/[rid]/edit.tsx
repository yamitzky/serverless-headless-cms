import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { SchemaForm } from '~/components/organisms/SchemaForm'

const AdminSchemaEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { updateResource } = useAppActions()
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
          title: '編集'
        }
      ]}
    >
      <Section title={schema?.name}>
        {schema && (
          <SchemaForm
            values={schema}
            onSubmit={async (schema) => {
              await updateResource(id, rid, schema)
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

export default AdminSchemaEditPage
