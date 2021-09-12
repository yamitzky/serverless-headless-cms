import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from '~/components/atoms/Link'
import { Section } from '~/components/molecules/Section'
import { config } from '~/config'

type Props = {
  title?: string
}

export const LoginTemplate: React.FC<Props> = ({ children, title }) => {
  return (
    <Box h="100vh" bg="gray.100" width="100vw" overflow="auto" color="gray.700">
      <Stack spacing={4} maxW={600} w="100%" mx="auto" py={8} px={2}>
        <Heading as="h1" textAlign="center">
          <Link href="/" textDecor="none">
            {config.title}
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
