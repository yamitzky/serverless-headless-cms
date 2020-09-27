import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { SchemaForm } from '~/components/organisms/SchemaForm'
import { useI18n } from '~/hooks/i18n'

const AdminSchemaEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { updateResource, removeResource } = useAppActions()
  const toast = useToast()
  const { t } = useI18n()

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: t('home'),
          href: `/admin/apps/${id}`
        },
        {
          title: t('schemaManagement')
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
      <Section title={rid}>
        {schema && (
          <SchemaForm
            values={schema}
            onRemove={async () => {
              await removeResource(id, rid)
              toast({
                title: t('deleted'),
                status: 'success'
              })
              router.push(`/admin/apps/${id}`)
            }}
            onSubmit={async (schema) => {
              await updateResource(id, rid, schema)
              toast({
                title: t('saved'),
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

export default AdminSchemaEditPage
