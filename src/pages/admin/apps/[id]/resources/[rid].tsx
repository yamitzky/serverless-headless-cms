import React, { useEffect, useState } from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppContext } from '~/hooks/app'
import { Resource, useResourceActions, useResources } from '~/hooks/resource'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Stack
} from '@chakra-ui/react'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useI18n } from '~/hooks/i18n'
import { ExternalLink } from '~/components/molecules/ExternalLink'
import { format } from 'date-fns'
import { config } from '~/config'
import { Order } from '~/hooks/resource-selector'
import { FaChevronDown } from 'react-icons/fa'

const orders = ['desc', 'asc'] as const

const AdminResourcesPage: React.FC = () => {
  const router = useRouter()
  const { t } = useI18n()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  const [sort, setSort] = useState<[string, Order, string]>([
    config.createdField,
    'desc',
    'createdAt' // label
  ])
  const { resources, loading, error } = useResources(id, rid, [
    sort[0],
    sort[1]
  ])

  const { fetch } = useResourceActions()
  const [reference, setReference] = useState<Record<string, Resource>>({})

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
          title: t('listOf', schema?.name)
        }
      ]}
    >
      <Section
        title={
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Box>{t('listOf', schema?.name || '')}</Box>
              <Stack isInline>
                <Button
                  variant="outline"
                  colorScheme="cyan"
                  onClick={() =>
                    router.push(`/admin/apps/${id}/resources/${rid}/new`)
                  }
                >
                  {t('create')}
                </Button>
                <Menu>
                  {/* TODO: more sort key */}
                  <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                    {t(sort[2] as any)}({t(sort[1])})
                  </MenuButton>
                  <MenuList fontSize="md">
                    {[
                      [config.createdField, 'createdAt'],
                      [config.updatedField, 'updatedAt']
                    ].map(([key, label], i) => (
                      <React.Fragment key={key}>
                        {!!i && <MenuDivider />}
                        {orders.map((order) => (
                          <MenuItem
                            key={order}
                            onClick={() => {
                              setSort([key, order, label as any])
                            }}
                          >
                            {t(label as any)}({t(order as any)})
                          </MenuItem>
                        ))}
                      </React.Fragment>
                    ))}
                  </MenuList>
                </Menu>
              </Stack>
            </Stack>
            {schema?.description && (
              <Box fontSize="md" fontWeight="normal">
                {schema.description}
              </Box>
            )}
          </Stack>
        }
      >
        <Stack spacing={4}>
          {loading ? (
            [0, 1, 2].map((i) => (
              <ListItem
                title={(<Skeleton height="20px" width="200px" />) as any}
                key={i}
              >
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </ListItem>
            ))
          ) : resources.length ? (
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
                        <Box w={[20, 40]}>{schema.fields[fid].name}</Box>
                        <Box flex={1} maxH={150} overflow="auto">
                          {schema.fields[fid].type === 'richtext' ? (
                            (res[fid] as string)?.replace(/<[^>]+>/g, ' ')
                          ) : schema.fields[fid].type === 'reference' ? (
                            reference[res[fid]] || res[fid]
                          ) : schema.fields[fid].type === 'file' ? (
                            <Box>
                              <Image src={res[fid]} maxH={100} w="auto" />
                              {res[fid] && (
                                <ExternalLink href={res[fid]}>URL</ExternalLink>
                              )}
                            </Box>
                          ) : (
                            res[fid]
                          )}
                        </Box>
                      </Stack>
                    ))
                  : null}
                <Stack isInline fontSize="sm" color="gray.500" mt={2}>
                  <Box>
                    {t('updatedAt')}:
                    {res[config.updatedField] &&
                      format(res[config.updatedField], 'yyyy-MM-dd H:mm')}
                  </Box>
                  <Box>
                    {t('createdAt')}:
                    {res[config.createdField] &&
                      format(res[config.createdField], 'yyyy-MM-dd H:mm')}
                  </Box>
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
          )}
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminResourcesPage
