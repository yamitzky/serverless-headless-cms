import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { useMemberActions, useMember } from '~/hooks/member'
import { MemberForm } from '~/components/organisms/MemberForm'
import { useI18n } from '~/hooks/i18n'

const AdminMemberEditPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const uid = router.query.uid as string

  const { update } = useMemberActions()
  const { member, loading, error } = useMember(id, uid)
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
          title: t('edit')
        }
      ]}
    >
      <Section title={uid}>
        {!loading && (
          <MemberForm
            values={member}
            onSubmit={async (mem) => {
              await update(id, uid, mem)
              toast({
                title: t('saved'),
                status: 'success',
                duration: 2000
              })
              router.push(`/admin/apps/${id}/members`)
            }}
          />
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminMemberEditPage
