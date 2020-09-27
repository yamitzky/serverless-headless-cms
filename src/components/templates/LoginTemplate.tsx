import { Box, Heading, Stack } from '@chakra-ui/core'
import React from 'react'
import { Link } from '~/components/atoms/Link'
import { Section } from '~/components/molecules/Section'

type Props = {
  title?: string
}

export const LoginTemplate: React.FC<Props> = ({ children, title }) => {
  return (
    <Box
      h="100vh"
      bg="gray.100"
      width="100vw"
      overflow="scroll"
      color="gray.700"
    >
      <Stack spacing={4} maxW={600} w="100%" mx="auto" py={8}>
        <Heading as="h1" textAlign="center">
          <Link href="/" textDecor="none">
            Serverless Headless CMS
          </Link>
        </Heading>
        <Section spacing={6} bg="white" textAlign="center">
          {title && <Heading size="lg">{title}</Heading>}
          <Box>{children}</Box>
        </Section>
      </Stack>
    </Box>
  )
}
