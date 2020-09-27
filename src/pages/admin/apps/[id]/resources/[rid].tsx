import React, { useEffect, useState } from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { Resource, useResourceActions, useResources } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Stack } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useI18n } from '~/hooks/i18n'

const AdminResourcesPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]
  const { resources, loading, error } = useResources(id, rid)
  const { fetch } = useResourceActions()
  const [reference, setReference] = useState<Record<string, Resource>>({})
  const { t } = useI18n()

  useEffect(() => {
    ;(async () => {
      for (const res of resources) {
        if (app && schema) {
          for (const fid of schema.fieldOrder) {
            const field = schema.fields[fid]
            const rid = field.referTo
            const iid = res[fid]
            if (rid && iid && reference[iid] == null) {
              const ref = await fetch(id, rid, iid)
              setReference((curr) => ({
                ...curr,
                [iid]: ref[app.schema[rid].fieldOrder[0]] || iid
              }))
            }
          }
        }
      }
    })()
  }, [id, fetch, schema, reference, resources, app])

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: t('home'),
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
            <Box>{schema?.name}一覧</Box>
            <Button
              variant="outline"
              variantColor="cyan"
              onClick={() =>
                router.push(`/admin/apps/${id}/resources/${rid}/new`)
              }
            >
              {t('create')}
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
                          <Box flex={1} maxH={150} overflow="scroll">
                            {schema.fields[fid].type === 'richtext'
                              ? (res[fid] as string)?.replace(/<[^>]+>/g, ' ')
                              : schema.fields[fid].type === 'reference'
                              ? reference[res[fid]] || res[fid]
                              : res[fid]}
                          </Box>
                        </Stack>
                      ))
                    : null}
                  <Stack direction="row">
                    <Box w={40}>{t('visibility')}</Box>
                    <Box flex={1}>{t(res.visibility)}</Box>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <EmptyCard>
                {t('emptyContent', {
                  name: schema?.name,
                  link: (
                    <Link href={`/admin/apps/${id}/resources/${rid}/new`}>
                      {t('createNew', schema?.name)}
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

export default AdminResourcesPage
