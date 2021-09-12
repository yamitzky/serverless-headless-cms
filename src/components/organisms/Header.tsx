import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModePreference,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import React from 'react'
import { useAuthActions, useAuthContext } from '~/hooks/auth'
import { Link } from '~/components/atoms/Link'
import { FaGithub, FaMoon, FaSun } from 'react-icons/fa'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useI18n } from '~/hooks/i18n'
import { config } from '~/config'

type Props = {
  action?: React.ReactNode
} & FlexProps

export const Header: React.FC<Props> = ({ action, ...props }) => {
  const { t } = useI18n()
  const router = useRouter()
  const { user, loading } = useAuthContext()
  const { logout } = useAuthActions()
  const toast = useToast()

  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex bg={bgColor} alignItems="center" py={2} px={4} {...props}>
      <Box flex="1" fontWeight="bold">
        {action && <Box display={['block', 'none']}>{action}</Box>}
        <Link
          href="/admin"
          textDecor="none"
          display={[action ? 'none' : 'block', 'block']}
        >
          {config.title}
        </Link>
      </Box>
      <Stack direction="row" alignItems="center" spacing={3} h="40px">
        {!config.hideGitHubLogo && (
          <Box color="gray.500">
            <NextLink
              href="https://github.com/yamitzky/serverless-headless-cms"
              passHref
            >
              <ChakraLink isExternal>
                <Box as={FaGithub} boxSize="32px" />
              </ChakraLink>
            </NextLink>
          </Box>
        )}
        <Box color="gray.500">
          <IconButton
            icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
            aria-label={`Color mode: ${colorMode}`}
            borderRadius="full"
            onClick={toggleColorMode}
          />
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
                {!config.singleProject && (
                  <MenuItem onClick={() => router.push('/admin')}>
                    {t('projectList')}
                  </MenuItem>
                )}
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
              colorScheme="cyan"
              size="sm"
              p={[0, null]}
              onClick={() => router.push('/login')}
            >
              {t('login')}
            </Button>
          ))}
      </Stack>
    </Flex>
  )
}
