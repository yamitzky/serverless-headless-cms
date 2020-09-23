import { Stack } from '@chakra-ui/core'
import React from 'react'
import { Link } from '~/components/atoms/Link'

type Props = {
  href: string
  action?: React.ReactNode
}

export const SidebarItem: React.FC<Props> = ({
  href,
  children,
  action,
  ...props
}) => {
  return (
    <Stack {...props} direction="row" justifyContent="space-between">
      <Link href={href} textDecor="none">
        {children}
      </Link>
      {action}
    </Stack>
  )
}
