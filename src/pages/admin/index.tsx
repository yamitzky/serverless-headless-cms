import { Box, Grid, PseudoBox, Skeleton } from '@chakra-ui/core'
import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApps } from '~/hooks/app'
import { Link } from '~/components/atoms/Link'
import { Section } from '~/components/molecules/Section'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { useAuthContext } from '~/hooks/auth'

const AdminHomePage: React.FC = () => {
  const { user, loading: uloading } = useAuthContext()
  const { apps, loading, error } = useApps(user?.uid)
  return (
    <AdminTemplate>
      <Section title="アプリケーション一覧">
        {uloading || loading ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Box
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
          <EmptyCard>アプリケーションはありません</EmptyCard>
        )}
      </Section>
    </AdminTemplate>
  )
}

export default AdminHomePage
