import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { AppForm } from '~/components/organisms/AppForm'
import { useAuthContext } from '~/hooks/auth'

const AdminSchemaNewPage: React.FC = () => {
  const router = useRouter()

  const { add } = useAppActions()
  const { user } = useAuthContext()
  const toast = useToast()

  return (
    <AdminTemplate
      breadcrumbs={[
        {
          title: 'アプリケーション一覧',
          href: `/admin`
        },
        {
          title: '作成'
        }
      ]}
    >
      <Section title="新規アプリケーション">
        <AppForm
          isNew
          onSubmit={async (app) => {
            const id = await add(app)
            toast({
              title: '保存しました',
              status: 'success',
              duration: 2000
            })
            router.push(`/admin/apps/${id}`)
          }}
        />
      </Section>
    </AdminTemplate>
  )
}

export default AdminSchemaNewPage
