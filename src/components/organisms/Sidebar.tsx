import React, { useState } from 'react'
import {
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useApps, useAppContext } from '~/hooks/app'
import { SidebarGroup } from '~/components/molecules/SidebarGroup'
import { SidebarItem } from '~/components/molecules/SidebarItem'
import { FaEdit, FaLock, FaTable } from 'react-icons/fa'
import { useAuthContext } from '~/hooks/auth'
import { useI18n } from '~/hooks/i18n'

export const Sidebar: React.FC = ({ ...props }) => {
  const { t } = useI18n()
  const router = useRouter()
  const { app } = useAppContext()
  const { user } = useAuthContext()
  const [fetchApps, setFetchApps] = useState(false)
  const { apps, loading: appsLoading } = useApps(
    fetchApps ? user?.uid : undefined
  )
  return (
    <Stack {...props} p={4} spacing={6}>
      <Menu>
        <MenuButton
          mb={6}
          as={Button}
          fontWeight="normal"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor="gray.300"
          pl={1}
          pr={2}
          onClick={() => setFetchApps(true)}
        >
          {app ? <Box>{app.name}</Box> : <Skeleton h="1.5em" w="100%" />}
          <Icon name="chevron-down" />
        </MenuButton>
        <MenuList>
          {appsLoading ? (
            <>
              <MenuItem>{app?.name}</MenuItem>
              {[0, 1, 2].map((i) => (
                <MenuItem key={i}>
                  <Skeleton h="1.5em" w="100%" />
                </MenuItem>
              ))}
            </>
          ) : (
            apps.map((app) => (
              <MenuItem
                key={app.id}
                onClick={() => {
                  router.push(`/admin/apps/${app.id}`)
                }}
              >
                {app.name}
              </MenuItem>
            ))
          )}
        </MenuList>
      </Menu>
      <SidebarGroup title={t('contents')} icon={FaEdit}>
        {app
          ? app.schemaOrder.map((id) => (
              <SidebarItem
                key={id}
                href={`/admin/apps/${app.id}/resources/${id}`}
                action={
                  <IconButton
                    icon="add"
                    aria-label={t('create')}
                    size="xs"
                    isRound
                    onClick={() =>
                      router.push(`/admin/apps/${app?.id}/resources/${id}/new`)
                    }
                  />
                }
              >
                {app.schema[id].name}
              </SidebarItem>
            ))
          : [0, 1, 2].map((i) => <Skeleton key={i} h="1.5em" w="100%" />)}
      </SidebarGroup>
      <SidebarGroup
        title={t('schemaManagement')}
        icon={FaTable}
        action={
          <IconButton
            icon="add"
            aria-label={t('create')}
            size="xs"
            isRound
            onClick={() => router.push(`/admin/apps/${app?.id}/schema/new`)}
          />
        }
      >
        {app
          ? app.schemaOrder.map((id) => (
              <SidebarItem key={id} href={`/admin/apps/${app.id}/schema/${id}`}>
                {app.schema[id].name}
              </SidebarItem>
            ))
          : [0, 1, 2].map((i) => <Skeleton key={i} h="1.5em" w="100%" />)}
      </SidebarGroup>
      <SidebarGroup title={t('security')} icon={FaLock}>
        <SidebarItem
          href={`/admin/apps/${app?.id}/members`}
          action={
            <IconButton
              icon="add"
              aria-label={t('invitation')}
              size="xs"
              isRound
              onClick={() => router.push(`/admin/apps/${app?.id}/members/new`)}
            />
          }
        >
          {t('userManagement')}
        </SidebarItem>
      </SidebarGroup>
    </Stack>
  )
}
