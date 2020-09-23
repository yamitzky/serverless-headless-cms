import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp } from '~/hooks/app'
import { useResourceActions } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Skeleton, useToast } from '@chakra-ui/core'
import { ResourceForm } from '~/components/organisms/ResourceForm'

const AdminResourceNewPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useApp(
    router.query.id as string
  )
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const { add } = useResourceActions()
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
          title: schema?.name || '',
          href: `/admin/apps/${id}/resources/${rid}`
        },
        {
          title: '作成'
        }
      ]}
    >
      <Section
        title={<Skeleton isLoaded={!appLoading}>{schema?.name}を作成</Skeleton>}
      >
        {schema && (
          <ResourceForm
            isNew
            onSubmit={async (res) => {
              await add(id, rid, res)
              toast({
                title: '保存しました',
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
