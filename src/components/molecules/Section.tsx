import {
  Box,
  Heading,
  Stack,
  StackProps,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  title?: React.ReactNode
} & Omit<StackProps, 'children' | 'title'>

export const Section: React.FC<Props> = ({ children, title, ...props }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  return (
    <Stack
      bg={bgColor}
      shadow="md"
      borderWidth="1px"
      p={[3, 6]}
      spacing={[4, 8]}
      {...props}
    >
      {title && <Heading size="xl">{title}</Heading>}
      <Box>{children}</Box>
    </Stack>
  )
}
