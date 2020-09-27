import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext, useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { SchemaForm } from '~/components/organisms/SchemaForm'
import { useI18n } from '~/hooks/i18n'

const AdminSchemaNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const id = router.query.id as string

  const { addResource } = useAppActions()
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
          title: t('create')
        }
      ]}
    >
      <Section title={t('schemaCreation')}>
        {app && (
          <SchemaForm
            isNew
            currentIds={app.schemaOrder}
            onSubmit={async (_schema) => {
              const { id: rid, ...schema } = _schema
              await addResource(id, rid!, schema)
              toast({
                title: t('created'),
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
