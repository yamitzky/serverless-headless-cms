import { Box, Heading, Stack } from '@chakra-ui/core'
import React from 'react'
import { Link } from '~/components/atoms/Link'

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
    <Stack
      {...props}
      shadow="sm"
      p={4}
      borderWidth={1}
      borderRadius={4}
      spacing={4}
    >
      <Heading size="lg">
        <Link href={href} textDecor="none">
          {title}
          {subtitle && (
            <Box as="span" ml={4} fontSize="80%" color="gray.500">
              {subtitle}
            </Box>
          )}
        </Link>
      </Heading>
      <Stack>{children}</Stack>
    </Stack>
  )
}
