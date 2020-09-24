import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { fieldTypeLabel, useAppContext } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Heading, Stack } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useMembers } from '~/hooks/member'

const AdminMembersPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { app } = useAppContext()
  const { members, loading, error } = useMembers(id)

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム',
          href: `/admin/apps/${id}`
        },
        {
          title: 'ユーザー管理'
        }
      ]}
    >
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Box flex={1}>ユーザー管理</Box>
            <Button
              variant="outline"
              variantColor="cyan"
              onClick={() => router.push(`/admin/apps/${id}/members/new`)}
            >
              招待
            </Button>
          </Stack>
        }
      >
        <Stack spacing={4}>
          {!loading &&
            (members.length ? (
              members.map((mem) => (
                <ListItem
                  title={mem.name}
                  subtitle={`ID: ${mem.id}`}
                  href={`/admin/apps/${id}/members/${mem.id}`}
                  key={mem.id}
                />
              ))
            ) : (
              <EmptyCard>
                まだ「{app?.name}」に誰も招待していないようです。
                共同編集するには、
                <Link href={`/admin/apps/${id}/members/new`}>
                  他のユーザーを招待
                </Link>
                してみましょう。
              </EmptyCard>
            ))}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminMembersPage
