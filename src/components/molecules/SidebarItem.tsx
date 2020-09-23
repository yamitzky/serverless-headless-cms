import { Box, Link } from '@chakra-ui/core'
import NextLink from 'next/link'
import React from 'react'

type Props = {
  href: string
}

export const SidebarItem: React.FC<Props> = ({ href, children, ...props }) => {
  return (
    <Box {...props}>
      <NextLink href={href} passHref>
        <Link>{children}</Link>
      </NextLink>
    </Box>
  )
}
