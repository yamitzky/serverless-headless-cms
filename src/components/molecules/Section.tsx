import { Box, Heading, Stack, StackProps } from '@chakra-ui/core'
import React from 'react'

type Props = {
  title?: React.ReactNode
} & Omit<StackProps, 'children' | 'title'>

export const Section: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <Stack
      bg="white"
      shadow="md"
      borderWidth="1px"
      p={6}
      spacing={8}
      {...props}
    >
      {title && <Heading>{title}</Heading>}
      <Box>{children}</Box>
    </Stack>
  )
}
