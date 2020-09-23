import { Box, Heading, Stack } from '@chakra-ui/core'
import React from 'react'

type Props = {
  title?: React.ReactNode
}

export const Section: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <Stack bg="white" p={6} spacing={8} {...props}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  )
}
