import { Box, Link } from '@chakra-ui/core'
import React from 'react'
import { AdminTemplate } from '~/components/templates/AdminTemplate'
import { useApps } from '~/hooks/app'

import NextLink from 'next/link'

const AdminHomePage: React.FC = () => {
  const { apps, loading, error } = useApps()
  return (
    <AdminTemplate>
      {apps.map((app) => (
        <Box key={app.id}>
          <NextLink href={`/admin/apps/${app.id}`} passHref>
            <Link>{app.name}</Link>
          </NextLink>
        </Box>
      ))}
    </AdminTemplate>
  )
}

export default AdminHomePage
