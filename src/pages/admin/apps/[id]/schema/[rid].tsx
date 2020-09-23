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

const AdminSchemaEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム',
          href: `/admin/apps/${id}`
        },
        {
          title: 'スキーマ管理'
        },
        {
          title: schema?.name || ''
        }
      ]}
    >
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Box flex={1}>{schema?.name || '　'}</Box>
            <Button
              variant="outline"
              variantColor="cyan"
              onClick={() =>
                router.push(`/admin/apps/${id}/schema/${rid}/edit`)
              }
            >
              編集
            </Button>
          </Stack>
        }
      >
        <Stack spacing={2}>
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between">
              <Heading size="lg">フィールド</Heading>
              <Button
                variant="outline"
                variantColor="cyan"
                size="sm"
                onClick={() =>
                  router.push(`/admin/apps/${id}/schema/${rid}/fields/new`)
                }
              >
                追加
              </Button>
            </Stack>
            {schema &&
              (schema.fieldOrder.length ? (
                schema.fieldOrder.map((fid) => (
                  <ListItem
                    title={schema.fields[fid].name}
                    subtitle={`ID: ${fid}`}
                    href={`/admin/apps/${id}/schema/${rid}/fields/${fid}`}
                    key={fid}
                  >
                    <Stack direction="row">
                      <Box w={40}>種類</Box>
                      <Box flex={1}>
                        {fieldTypeLabel[schema.fields[fid].type]}
                      </Box>
                    </Stack>
                  </ListItem>
                ))
              ) : (
                <EmptyCard>
                  「{schema.name}
                  」にはまだフィールドがありません。「タイトル」や「本文」などの
                  <Link href={`/admin/apps/${id}/schema/${rid}/fields/new`}>
                    フィールドを作成
                  </Link>
                  してみましょう。
                </EmptyCard>
              ))}
          </Stack>
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminSchemaEditPage
