import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { useResourceActions } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { ResourceForm } from '~/components/organisms/ResourceForm'
import { useI18n } from '~/hooks/i18n'

const AdminResourceNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { add, fetchAll } = useResourceActions()
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
          title: schema?.name || '',
          href: `/admin/apps/${id}/resources/${rid}`
        },
        {
          title: t('create')
        }
      ]}
    >
      <Section title={t('create', schema?.name)}>
        {app && schema && (
          <ResourceForm
            isNew
            allSchema={app.schema}
            fetchAllReference={(rid) => fetchAll(id, rid)}
            onSubmit={async (res) => {
              await add(id, rid, res)
              toast({
                title: t('created'),
                status: 'success',
                duration: 2000
              })
              router.push(`/admin/apps/${id}/resources/${rid}`)
            }}
            fields={schema.fieldOrder.map((fid) => ({
              ...schema.fields[fid],
              id: fid
            }))}
          />
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminResourceNewPage
