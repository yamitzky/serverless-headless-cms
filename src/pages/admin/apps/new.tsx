import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppActions } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/react'
import { AppForm } from '~/components/organisms/AppForm'
import { useAuthContext } from '~/hooks/auth'
import { useI18n } from '~/hooks/i18n'

const AdminSchemaNewPage: React.FC = () => {
  const router = useRouter()
  const { t } = useI18n()

  const { add } = useAppActions()
  const toast = useToast()

  return (
    <AdminTemplate
      breadcrumbs={[
        {
          title: t('projectList'),
          href: `/admin`
        },
        {
          title: t('create')
        }
      ]}
    >
      <Section title={t('projectCreation')}>
        <AppForm
          isNew
          onSubmit={async (app) => {
            const id = await add(app)
            toast({
              title: t('saved'),
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
