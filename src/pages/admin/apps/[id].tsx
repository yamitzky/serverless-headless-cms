import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Skeleton } from '@chakra-ui/core'

const AdminAppPage: React.FC = () => {
  const router = useRouter()
  const { app, loading, error } = useApp(router.query.id as string)
  return (
    <AdminTemplate sidebar={<Sidebar />}>
      <Section
        title={<Skeleton isLoaded={!loading}>{app?.name || '　'}</Skeleton>}
      >
        使い方の説明
      </Section>
    </AdminTemplate>
  )
}

export default AdminAppPage
