import { Box, BoxProps, Icon, Text } from '@chakra-ui/core'
import React from 'react'

type Props = BoxProps

export const EmptyCard: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Text
      borderWidth={1}
      p={4}
      textAlign="center"
      bg="gray.50"
      borderRadius={8}
      {...props}
    >
      {children}
    </Text>
  )
}
