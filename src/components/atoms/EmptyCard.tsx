import { BoxProps, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = BoxProps

export const EmptyCard: React.FC<Props> = ({ children, ...props }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  return (
    <Text
      borderWidth={1}
      p={4}
      textAlign="center"
      bg={bgColor}
      borderRadius={8}
      {...props}
    >
      {children}
    </Text>
  )
}
