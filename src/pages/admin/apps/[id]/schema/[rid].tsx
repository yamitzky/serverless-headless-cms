import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { fieldTypeLabel, useApp } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Flex, Link, Skeleton, Stack } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'
import NextLink from 'next/link'

const AdminSchemaEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useApp(
    router.query.id as string
  )
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  return (
    <AdminTemplate sidebar={<Sidebar />}>
      <Section
        title={
          <Stack direction="row" justifyContent="space-between">
            <Skeleton isLoaded={!appLoading} flex={1}>
              <NextLink href={`/admin/apps/${id}/schema/${rid}/edit`} passHref>
                <Link>{schema?.name || '　'}</Link>
              </NextLink>
            </Skeleton>
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/admin/apps/${id}/schema/${rid}/fields/new`)
              }
            >
              フィールドを追加
            </Button>
          </Stack>
        }
      >
        <Stack spacing={4}>
          {schema &&
            schema.fieldOrder.map((fid) => (
              <ListItem
                title={schema.fields[fid].name}
                subtitle={`ID: ${fid}`}
                href={`/admin/apps/${id}/schema/resources/${rid}/${fid}`}
                key={fid}
              >
                <Stack direction="row">
                  <Box w={40}>種類</Box>
                  <Box flex={1}>{fieldTypeLabel[schema.fields[fid].type]}</Box>
                </Stack>
              </ListItem>
            ))}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminSchemaEditPage
