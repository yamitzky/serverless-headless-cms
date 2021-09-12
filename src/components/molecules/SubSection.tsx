import { Box, Heading, Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title?: React.ReactNode
} & Omit<StackProps, 'children' | 'title'>

export const SubSection: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <Stack {...props}>
      {title && (
        <Heading as="h3" size="lg">
          {title}
        </Heading>
      )}
      {children}
    </Stack>
  )
}
