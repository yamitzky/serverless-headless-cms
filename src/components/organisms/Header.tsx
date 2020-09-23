import { Avatar, Box, Flex, FlexProps } from '@chakra-ui/core'
import React from 'react'
import { useAuthContext } from '~/hooks/auth'
import { Link } from '~/components/atoms/Link'

export const Header: React.FC<FlexProps> = ({ ...props }) => {
  const { user, loading } = useAuthContext()
  return (
    <Flex bg="gray.50" alignItems="center" py={2} px={4} {...props}>
      <Box flex="1" fontWeight="bold">
        <Link href="/admin" textDecor="none">
          Serverless Headless CMS
        </Link>
      </Box>
      <Avatar
        name={user?.displayName || user?.email || user?.uid}
        src={user?.photoURL!}
        size="sm"
      />
    </Flex>
  )
}
