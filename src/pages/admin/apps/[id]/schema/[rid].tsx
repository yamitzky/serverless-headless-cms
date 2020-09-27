import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useAppActions, useAppContext } from '~/hooks/app'
import { useRouter } from 'next/router'
import { Sidebar } from '~/components/organisms/Sidebar'
import { Section } from '~/components/molecules/Section'
import { Box, Button, Heading, Stack, Tag, useToast } from '@chakra-ui/core'
import { ListItem } from '~/components/molecules/ListItem'
import { EmptyCard } from '~/components/atoms/EmptyCard'
import { Link } from '~/components/atoms/Link'
import { useI18n } from '~/hooks/i18n'

const AdminSchemaEditPage: React.FC = () => {
  const router = useRouter()
  const { app, loading: appLoading, error: appError } = useAppContext()
  const { removeField } = useAppActions()
  const toast = useToast()
  const { t } = useI18n()
  const rid = router.query.rid as string
  const id = router.query.id as string
  const schema = app?.schema[rid]

  return (
    <AdminTemplate
      sidebar={<Sidebar />}
      breadcrumbs={[
        {
          title: t('home'),
          href: `/admin/apps/${id}`
        },
        {
          title: t('schemaManagement')
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
              <Heading size="lg">{t('field')}</Heading>
              <Button
                variant="outline"
                variantColor="cyan"
                size="sm"
                onClick={() =>
                  router.push(`/admin/apps/${id}/schema/${rid}/fields/new`)
                }
              >
                {t('add')}
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
                    onRemove={async () => {
                      await removeField(id, rid, fid)
                      toast({
                        title: t('deleted'),
                        status: 'success',
                        duration: 2000
                      })
                    }}
                  >
                    <Stack direction="row">
                      <Box w={40}>{t('type')}</Box>
                      <Box flex={1}>
                        {schema.fields[fid].type === 'reference' &&
                          `「${
                            app?.schema[schema.fields[fid].referTo!]?.name
                          }」への`}
                        {t(schema.fields[fid].type)}
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box w={40}>{t('validation')}</Box>
                      <Stack direction="row" spacing={4}>
                        {schema.fields[fid].required && (
                          <Tag>{t('required')}</Tag>
                        )}
                        {schema.fields[fid].pattern && (
                          <Tag>
                            {t('pattern')}: /{schema.fields[fid].pattern}/
                          </Tag>
                        )}
                        {schema.fields[fid].min != null && (
                          <Tag>
                            {t('min')}: {schema.fields[fid].min}
                          </Tag>
                        )}
                        {schema.fields[fid].max != null && (
                          <Tag>
                            {t('max')}: {schema.fields[fid].max}
                          </Tag>
                        )}
                      </Stack>
                    </Stack>
                    {schema.fields[fid].description && (
                      <Stack direction="row">
                        <Box w={40}>{t('description')}</Box>
                        <Box>{schema.fields[fid].description}</Box>
                      </Stack>
                    )}
                  </ListItem>
                ))
              ) : (
                <EmptyCard>
                  {t('emptyField', {
                    name: schema.name,
                    link: (
                      <Link href={`/admin/apps/${id}/schema/${rid}/fields/new`}>
                        {t('createField')}
                      </Link>
                    )
                  })}
                </EmptyCard>
              ))}
          </Stack>
        </Stack>
      </Section>
    </AdminTemplate>
  )
}

export default AdminSchemaEditPage
