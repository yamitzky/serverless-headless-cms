import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp } from '~/hooks/app'
import { useResources, visibilityLabel } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Skeleton, Stack } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'

const AdminResourcesPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useApp(
    router.query.id as string
  )
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]
  const { resources, loading, error } = useResources(id, rid)

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: 'ホーム',
          href: `/admin/apps/${id}`
        },
        {
          title: `${schema?.name || ''}一覧`
        }
      ]}
    >
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Skeleton flex={1} isLoaded={!appLoading}>
              {schema?.name}一覧
            </Skeleton>
            <Button
              variant="outline"
              variantColor="cyan"
              onClick={() =>
                router.push(`/admin/apps/${id}/resources/${rid}/new`)
              }
            >
              作成
            </Button>
          </Stack>
        }
      >
        <Stack spacing={4}>
          {!loading &&
            (resources.length ? (
              resources.map((res) => (
                <ListItem
                  title={res[schema?.fieldOrder[0]!] || res.id}
                  subtitle={!!res[schema?.fieldOrder[0]!] && `ID: ${res.id}`}
                  href={`/admin/apps/${id}/resources/${rid}/${res.id}`}
                  key={res.id}
                >
                  {schema
                    ? schema.fieldOrder.map((fid) => (
                        <Stack key={fid} direction="row">
                          <Box w={40}>{schema.fields[fid].name}</Box>
                          <Box flex={1}>{res[fid]}</Box>
                        </Stack>
                      ))
                    : null}
                  <Stack direction="row">
                    <Box w={40}>公開設定</Box>
                    <Box flex={1}>{visibilityLabel[res.visibility]}</Box>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <EmptyCard>
                まだ「{schema?.name}」を作成してないようです。
                <Link href={`/admin/apps/${id}/resources/${rid}/new`}>
                  新しい「
                  {schema?.name}」を作成
                </Link>
                してみましょう。
              </EmptyCard>
            ))}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminResourcesPage
