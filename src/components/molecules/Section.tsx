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
      p={[3, 6]}
      spacing={[4, 8]}
      {...props}
    >
      {title && <Heading fontSize={['2xl', '3xl']}>{title}</Heading>}
      <Box>{children}</Box>
    </Stack>
  )
}
