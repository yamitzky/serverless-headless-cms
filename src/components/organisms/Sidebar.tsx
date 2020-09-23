import React from 'react'
import { IconButton, Select, Stack } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useApp } from '~/hooks/app'
import { SidebarGroup } from '~/components/molecules/SidebarGroup'
import { SidebarItem } from '~/components/molecules/SidebarItem'
import { FaEdit, FaTable } from 'react-icons/fa'

export const Sidebar: React.FC = ({ ...props }) => {
  const router = useRouter()
  const { app } = useApp(router.query.id as string)
  return (
    <Stack {...props} p={4} spacing={6}>
      <Select variant="flushed" value={app?.name} cursor="pointer">
        <option>{app?.name}</option>
      </Select>
      <SidebarGroup title="コンテンツ" icon={FaEdit}>
        {app
          ? app.schemaOrder.map((id) => (
              <SidebarItem
                key={id}
                href={`/admin/apps/${app.id}/resources/${id}`}
                action={
                  <IconButton
                    icon="add"
                    aria-label="作成"
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
          : null}
      </SidebarGroup>
      <SidebarGroup
        title="スキーマ管理"
        icon={FaTable}
        action={
          <IconButton
            icon="add"
            aria-label="作成"
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
          : null}
      </SidebarGroup>
    </Stack>
  )
}
