import { Box, Flex, Stack } from '@chakra-ui/core'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Header } from '~/components/organisms/Header'
import { useAuth } from '~/hooks/auth'

type Props = {
  sidebar?: React.ReactNode
}

export const AdminTemplate: React.FC<Props> = ({
  children,
  sidebar,
  ...props
}) => {
  const { user, loading, error } = useAuth()
  const router = useRouter()
  if (!loading && (!user || error)) {
    router.push('/login')
  }

  return (
    <Flex h="100vh" direction="column">
      <Header boxShadow="md" zIndex={'sticky' as any} />
      <Flex flex={1} direction="row" {...props}>
        {sidebar && (
          <Box w={200} h="100%" overflow="scroll" bg="gray.100">
            {sidebar}
          </Box>
        )}
        <Box bg="gray.50" flex={1} h="100%" overflow="scroll" py={6} px={8}>
          <Stack maxW={1440} mx="auto">
            {children}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
