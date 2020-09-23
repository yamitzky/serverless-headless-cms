import { Box, Heading, Stack } from '@chakra-ui/core'
import React from 'react'

type Props = {
  title: string
}

export const SimpleTemplate: React.FC<Props> = ({ children, title }) => {
  return (
    <Box h="100vh" bg="gray.100" width="100vw" overflow="scroll">
      <Stack spacing={4} maxW={600} w="100%" mx="auto" py={8}>
        <Heading>Serverless Headless CMS</Heading>
        <Stack p={6} spacing={4} bg="white">
          <Heading as="h2" size="md">
            {title}
          </Heading>
          <Box>{children}</Box>
        </Stack>
      </Stack>
    </Box>
  )
}
