import { Box, Flex, Stack } from '@chakra-ui/core'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Header } from '~/components/organisms/Header'
import { useAuth } from '~/hooks/auth'
import { Breadcrumbs, Breadcrumb } from '~/components/molecules/Breadcrumbs'
import { useApp } from '~/hooks/app'

type Props = {
  sidebar?: React.ReactNode
  breadcrumbs?: Breadcrumb[]
}

export const AdminTemplate: React.FC<Props> = ({
  breadcrumbs,
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
          <Box
            w={240}
            h="100%"
            overflow="scroll"
            bg="gray.100"
            borderRightWidth={1}
          >
            {sidebar}
          </Box>
        )}
        <Box bg="gray.50" flex={1} h="100%" overflow="scroll" py={6} px={8}>
          <Stack maxW={1440} mx="auto" spacing={6}>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            {children}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
