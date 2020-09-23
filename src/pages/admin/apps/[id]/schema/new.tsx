import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { SchemaForm } from '~/components/organisms/SchemaForm'

const AdminSchemaNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const id = router.query.id as string

  const { addResource } = useAppActions()
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
          title: '作成'
        }
      ]}
    >
      <Section title="スキーマ作成">
        {app && (
          <SchemaForm
            isNew
            currentIds={app.schemaOrder}
            onSubmit={async (_schema) => {
              const { id: rid, ...schema } = _schema
              await addResource(id, rid!, schema)
              toast({
                title: '保存しました',
                status: 'success',
                duration: 2000
              })
              router.push(`/admin/apps/${id}/schema/${rid!}`)
            }}
          />
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminSchemaNewPage
