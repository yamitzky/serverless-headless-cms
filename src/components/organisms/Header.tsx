import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  Icon,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useToast
} from '@chakra-ui/core'
import React from 'react'
import { useAuthActions, useAuthContext } from '~/hooks/auth'
import { Link } from '~/components/atoms/Link'
import { FaGithub } from 'react-icons/fa'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const Header: React.FC<FlexProps> = ({ ...props }) => {
  const router = useRouter()
  const { user, loading } = useAuthContext()
  const { logout } = useAuthActions()
  const toast = useToast()

  return (
    <Flex bg="gray.50" alignItems="center" py={2} px={4} {...props}>
      <Box flex="1" fontWeight="bold">
        <Link href="/admin" textDecor="none">
          Serverless Headless CMS
        </Link>
      </Box>
      <Stack direction="row" alignItems="center" spacing={3} h="40px">
        <Box color="gray.500">
          <NextLink
            href="https://github.com/yamitzky/serverless-headless-cms"
            passHref
          >
            <ChakraLink isExternal>
              <Box as={FaGithub} size="32px" />
            </ChakraLink>
          </NextLink>
        </Box>
        {!loading &&
          (user ? (
            <Menu>
              <MenuButton
                as={Button}
                borderRadius="full"
                p={0}
                {...{ variant: 'ghost' }}
              >
                <Avatar
                  name={user?.displayName || user?.email || user?.uid}
                  src={user?.photoURL!}
                  size="sm"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push('/admin')}>
                  プロジェクト一覧
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await logout()
                    toast({
                      title: 'ログアウトしました',
                      status: 'success'
                    })
                  }}
                >
                  ログアウト
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="ghost"
              variantColor="cyan"
              size="sm"
              onClick={() => router.push('/login')}
            >
              ログイン
            </Button>
          ))}
      </Stack>
    </Flex>
  )
}
