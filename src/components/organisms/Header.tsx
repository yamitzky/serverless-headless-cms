import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
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
import { useI18n } from '~/hooks/i18n'

type Props = {
  action?: React.ReactNode
} & FlexProps

export const Header: React.FC<Props> = ({ action, ...props }) => {
  const { t } = useI18n()
  const router = useRouter()
  const { user, loading } = useAuthContext()
  const { logout } = useAuthActions()
  const toast = useToast()

  return (
    <Flex bg="gray.50" alignItems="center" py={2} px={4} {...props}>
      <Box flex="1" fontWeight="bold">
        {action && <Box display={['block', 'none']}>{action}</Box>}
        <Link
          href="/admin"
          textDecor="none"
          display={[action ? 'none' : 'block', 'block']}
        >
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
              <MenuList placement="bottom-end">
                <MenuItem onClick={() => router.push('/admin')}>
                  {t('projectList')}
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await logout()
                    toast({
                      title: t('loggedOut'),
                      status: 'success'
                    })
                  }}
                >
                  {t('logout')}
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
              {t('login')}
            </Button>
          ))}
      </Stack>
    </Flex>
  )
}
