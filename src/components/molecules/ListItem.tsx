import { Box, Heading, Link, Stack } from '@chakra-ui/core'
import React from 'react'
import NextLink from 'next/link'

type Props = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  href: string
}

export const ListItem: React.FC<Props> = ({
  title,
  subtitle,
  href,
  children,
  ...props
}) => {
  return (
    <Stack {...props}>
      <Heading size="lg">
        <NextLink href={href} passHref>
          <Link>
            {title}
            {subtitle && (
              <Box as="span" ml={4} fontSize="80%" color="gray.500">
                {subtitle}
              </Box>
            )}
          </Link>
        </NextLink>
      </Heading>
      <Stack>{children}</Stack>
    </Stack>
  )
}
