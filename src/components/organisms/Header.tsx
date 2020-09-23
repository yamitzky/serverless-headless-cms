import { Avatar, Box, Flex, FlexProps, Link, Skeleton } from '@chakra-ui/core'
import React from 'react'
import { useAuth } from '~/hooks/auth'
import NextLink from 'next/link'

export const Header: React.FC<FlexProps> = ({ ...props }) => {
  const { user, loading } = useAuth()
  return (
    <Flex bg="gray.50" alignItems="center" py={2} px={4} {...props}>
      <Box flex="1" fontWeight="bold">
        <NextLink href="/admin" passHref>
          <Link>Serverless Headless CMS</Link>
        </NextLink>
      </Box>
      <Skeleton isLoaded={!loading}>
        <Avatar
          name={user?.displayName || user?.email || user?.uid}
          src={user?.photoURL!}
          size="sm"
        />
      </Skeleton>
    </Flex>
  )
}
