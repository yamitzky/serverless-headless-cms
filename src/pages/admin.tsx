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
import { useI18n } from '~/hooks/i18n'
import { config } from '~/config'
import { app } from 'firebase'

const AdminHomePage: React.FC = () => {
  const router = useRouter()
  const { user, loading: uloading } = useAuthContext()
  const { apps, loading, error } = useApps(user?.uid)
  const { t } = useI18n()

  if (config.singleProject && apps.length) {
    router.push(`/admin/apps/${apps[0].id}`)
  }
  const mayredirect = config.singleProject && (apps.length || loading)

  return (
    <AdminTemplate
      breadcrumbs={
        mayredirect
          ? undefined
          : [
              {
                title: t('home')
              }
            ]
      }
    >
      {!mayredirect && (
        <Section
          title={
            <Stack direction="row">
              <Box flex={1}>{t('projectList')}</Box>
              <Button
                variant="outline"
                variantColor="cyan"
                onClick={() => router.push(`/admin/apps/new`)}
              >
                {t('create')}
              </Button>
            </Stack>
          }
        >
          {uloading || loading ? (
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
              gap={[3, 6]}
            >
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
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
              gap={[3, 6]}
            >
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
              {t(
                'emptyProject',
                <Link href="/admin/apps/new">{t('createProject')}</Link>
              )}
            </EmptyCard>
          )}
          <EmptyCard mt={8}>
            {t(
              'joinProject',
              <Code mx={2} fontWeight="bold">
                {user?.uid}
              </Code>
            )}
          </EmptyCard>
        </Section>
      )}
    </AdminTemplate>
  )
}

export default AdminHomePage
