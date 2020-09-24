import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { useToast } from '@chakra-ui/core'
import { useMemberActions, useMember } from '~/hooks/member'
import { MemberForm } from '~/components/organisms/MemberForm'

const AdminMemberEditPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const uid = router.query.uid as string

  const { update } = useMemberActions()
  const { member, loading, error } = useMember(id, uid)
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
          title: 'ユーザー管理',
          href: `/admin/apps/${id}/members`
        },
        {
          title: '招待'
        }
      ]}
    >
      <Section title="編集">
        {!loading && (
          <MemberForm
            values={member}
            onSubmit={async (mem) => {
              await update(id, uid, mem)
              toast({
                title: '保存しました',
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
