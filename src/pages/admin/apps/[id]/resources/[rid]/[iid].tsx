import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { useResource, useResourceActions } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { ResourceForm } from '~/components/organisms/ResourceForm'
import { useI18n } from '~/hooks/i18n'

const AdminResourceEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const iid = router.query.iid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]
  const { resource, loading, error } = useResource(id, rid, iid)

  const { update, fetchAll, remove } = useResourceActions()
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
          title: t('edit')
        }
      ]}
    >
      <Section title={iid}>
        {app && schema && resource && (
          <ResourceForm
            allSchema={app.schema}
            fetchReference={(rid) => fetchAll(id, rid)}
            values={resource}
            onRemove={async () => {
              await remove(id, rid, iid)
              toast({
                title: t('deleted'),
                status: 'success'
              })
              router.push(`/admin/apps/${id}/resources/${rid}`)
            }}
            onSubmit={async (res) => {
              await update(id, rid, iid, res)
              toast({
                title: t('saved'),
                status: 'success',
                duration: 2000
              })
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

export default AdminResourceEditPage
