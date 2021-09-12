import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Stack, useToast } from '@chakra-ui/react'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useMemberActions, useMembers } from '~/hooks/member'
import { useI18n } from '~/hooks/i18n'

const AdminMembersPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { app } = useAppContext()
  const { members, loading, error } = useMembers(id)
  const { remove } = useMemberActions()
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
          title: t('userManagement')
        }
      ]}
    >
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Box flex={1}>{t('userManagement')}</Box>
            <Button
              variant="outline"
              colorScheme="cyan"
              onClick={() => router.push(`/admin/apps/${id}/members/new`)}
            >
              {t('invitation')}
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
                  onRemove={async () => {
                    await remove(id, mem.id)
                    toast({
                      title: t('deleted'),
                      status: 'success',
                      duration: 2000
                    })
                  }}
                />
              ))
            ) : (
              <EmptyCard>
                {t('noInvitation', {
                  name: app?.name,
                  link: (
                    <Link href={`/admin/apps/${id}/members/new`}>
                      {t('inviteOther')}
                    </Link>
                  )
                })}
              </EmptyCard>
            ))}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminMembersPage
