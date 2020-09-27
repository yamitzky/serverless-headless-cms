import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { useMemberActions, useMembers } from '~/hooks/member'
import { MemberForm } from '~/components/organisms/MemberForm'
import { useI18n } from '~/hooks/i18n'

const AdminMemberNewPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { add } = useMemberActions()
  const { members } = useMembers(id)
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
          title: t('userManagement'),
          href: `/admin/apps/${id}/members`
        },
        {
          title: t('invitation')
        }
      ]}
    >
      <Section title={t('invitation')}>
        <MemberForm
          isNew
          currentIds={members.map((m) => m.id)}
          onSubmit={async (_mem) => {
            const { id: uid, ...mem } = _mem
            await add(id, uid, mem)
            toast({
              title: t('invited'),
              status: 'success',
              duration: 2000
            })
            router.push(`/admin/apps/${id}/members`)
          }}
        />
      </Section>
    </AdminTemplate>
  )
}

export default AdminMemberNewPage
