import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApp, useResources, visibilityLabel } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Skeleton, Stack } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'

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
    <AdminTemplate sidebar={<Sidebar />}>
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Skeleton flex={1} isLoaded={!appLoading}>
              {schema?.name || '　'}
            </Skeleton>
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/admin/apps/${id}/resources/${rid}/new`)
              }
            >
              追加
            </Button>
          </Stack>
        }
      >
        <Stack spacing={4}>
          {resources.map((res) => (
            <ListItem
              title={res[schema?.labelField!] || `ID: ${res.id}`}
              subtitle={res[schema?.labelField!] != null && `ID: ${res.id}`}
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
          ))}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminResourcesPage
