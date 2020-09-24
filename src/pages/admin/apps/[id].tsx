import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, List, ListItem, Stack } from '@chakra-ui/core'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'

const AdminAppPage: React.FC = () => {
  const { app, loading, error } = useAppContext()
  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム'
        }
      ]}
    >
      <Section title={app?.name}>
        {app &&
          (app.schemaOrder.length ? (
            <Stack spacing={4}>
              <Box>「{app.name}」の CMS へようこそ！</Box>
              <List styleType="disc" ml={4} spacing={3}>
                {app.schemaOrder.map((rid) => (
                  <ListItem key={rid}>
                    「{app.schema[rid].name}」の管理
                    <Link
                      href={`/admin/apps/${app.id}/resources/${rid}/new`}
                      ml={4}
                    >
                      作成
                    </Link>
                    <Link
                      href={`/admin/apps/${app.id}/resources/${rid}`}
                      ml={2}
                    >
                      一覧
                    </Link>
                    <Link href={`/admin/apps/${app.id}/schema/${rid}`} ml={2}>
                      スキーマ変更
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Stack>
          ) : (
            <EmptyCard>
              スキーマが一つもありません。「記事」などの
              <Link href={`/admin/apps/${app.id}/schema/new`}>
                スキーマを作成
              </Link>
              してみましょう。
            </EmptyCard>
          ))}
      </Section>
    </AdminTemplate>
  )
}

export default AdminAppPage
