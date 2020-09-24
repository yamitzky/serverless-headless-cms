import {
  Box,
  Button,
  Code,
  Grid,
  PseudoBox,
  Skeleton,
  Stack
} from '@chakra-ui/core'
import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApps } from '~/hooks/app'
import { Link } from '~/components/atoms/Link'
import { Section } from '~/components/molecules/Section'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { useAuthContext } from '~/hooks/auth'
import { useRouter } from 'next/router'

const AdminHomePage: React.FC = () => {
  const router = useRouter()
  const { user, loading: uloading } = useAuthContext()
  const { apps, loading, error } = useApps(user?.uid)
  console.log(error)
  return (
    <AdminTemplate
      breadcrumbs={[
        {
          title: 'ホーム'
        }
      ]}
    >
      <Section
        title={
          <Stack direction="row">
            <Box flex={1}>アプリケーション一覧</Box>
            <Button
              variant="outline"
              variantColor="cyan"
              onClick={() => router.push(`/admin/apps/new`)}
            >
              作成
            </Button>
          </Stack>
        }
      >
        {uloading || loading ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                textDecor="none"
                shadow="md"
                display="block"
                p={4}
                borderWidth={1}
                borderRadius={8}
                fontWeight="bold"
              >
                <Skeleton h="1.5em" />
              </Box>
            ))}
          </Grid>
        ) : apps.length ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {apps.map((app) => (
              <Link
                textDecor="none"
                href={`/admin/apps/${app.id}`}
                key={app.id}
                _hover={{ shadow: 'sm' }}
                shadow="md"
                display="block"
                p={4}
                borderWidth={1}
                borderRadius={8}
                fontWeight="bold"
              >
                <PseudoBox>{app.name}</PseudoBox>
              </Link>
            ))}
          </Grid>
        ) : (
          <EmptyCard>
            まだアプリケーションはありません。
            <Link href="/admin/apps/new">アプリケーションを作成</Link>
            してみましょう。
          </EmptyCard>
        )}
        <EmptyCard mt={8}>
          他のアプリケーションに参加するには、あなたのユーザーID
          <Code mx={2} fontWeight="bold">
            {user?.uid}
          </Code>
          を伝えてください
        </EmptyCard>
      </Section>
    </AdminTemplate>
  )
}

export default AdminHomePage
