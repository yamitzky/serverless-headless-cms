import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'

const AdminAppPage: React.FC = () => {
  const { app, loading, error } = useAppContext()
  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム'
        }
      ]}
    >
      <Section title={app?.name}>使い方の説明</Section>
    </AdminTemplate>
  )
}

export default AdminAppPage
