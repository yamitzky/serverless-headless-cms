import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, List, ListItem, Stack } from '@chakra-ui/react'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useI18n } from '~/hooks/i18n'
import { useAuthContext } from '~/hooks/auth'
import { config } from '~/config'

const AdminAppPage: React.FC = () => {
  const { app, loading, error } = useAppContext()
  const { t } = useI18n()
  const { user } = useAuthContext()

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: t('home')
        }
      ]}
    >
      <Section title={app?.name}>
        {app &&
          (app.schemaOrder.length ? (
            <Stack spacing={4}>
              <Box>{t('welcomeCMS', app.name)}</Box>
              <List styleType="disc" ml={4} spacing={3} stylePosition="inside">
                {app.schemaOrder.map((rid) => (
                  <ListItem key={rid}>
                    {t('manage', app.schema[rid].name)}
                    <Link
                      href={`/admin/apps/${app.id}/resources/${rid}/new`}
                      ml={4}
                    >
                      {t('create')}
                    </Link>
                    <Link
                      href={`/admin/apps/${app.id}/resources/${rid}`}
                      ml={2}
                    >
                      {t('list')}
                    </Link>
                    {(config.schemaPermission === 'everyone' ||
                      (user && app?.owner === user?.uid)) && (
                      <Link href={`/admin/apps/${app.id}/schema/${rid}`} ml={2}>
                        {t('schemaManagement')}
                      </Link>
                    )}
                  </ListItem>
                ))}
              </List>
            </Stack>
          ) : (
            <EmptyCard>
              {t(
                'emptySchema',
                <Link href={`/admin/apps/${app.id}/schema/new`}>
                  {t('createSchema')}
                </Link>
              )}
            </EmptyCard>
          ))}
      </Section>
    </AdminTemplate>
  )
}

export default AdminAppPage
