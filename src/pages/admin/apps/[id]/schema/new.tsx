import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Skeleton, useToast } from '@chakra-ui/core'
import { SchemaForm } from '~/components/organisms/SchemaForm'

const AdminSchemaNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useApp(
    router.query.id as string
  )
  const id = router.query.id as string

  const { addResource } = useAppActions()
  const toast = useToast()

  return (
    <AdminTemplate sidebar={<Sidebar />}>
      <Section title={<Skeleton isLoaded={!appLoading}>スキーマ作成</Skeleton>}>
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
