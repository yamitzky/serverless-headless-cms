import {
  Box,
  Flex,
  IconButton,
  Stack,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/core'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Header } from '~/components/organisms/Header'
import { useAuthContext } from '~/hooks/auth'
import { Breadcrumbs, Breadcrumb } from '~/components/molecules/Breadcrumbs'
import { FaBars } from 'react-icons/fa'

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
  const { user, loading, error } = useAuthContext()
  const router = useRouter()
  if (!loading && (!user || error)) {
    router.push('/login')
  }
  const { isOpen, onClose, onToggle } = useDisclosure()

  return (
    <Flex h="100vh" direction="column" color="gray.700">
      <Header
        action={
          sidebar ? (
            <>
              <IconButton
                aria-label="Show menu"
                icon={FaBars}
                variant="ghost"
                p={0}
                onClick={onToggle}
              />
              <Drawer
                size="xs"
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
              >
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerBody p={0} overflow="auto">
                      {sidebar}
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </>
          ) : null
        }
        boxShadow="md"
        zIndex={'sticky' as any}
      />
      <Flex flex={1} direction="row" overflow="hidden" {...props}>
        {sidebar && (
          <Box
            display={['none', 'block']}
            w={240}
            h="100%"
            overflow="auto"
            bg="gray.100"
            borderRightWidth={1}
          >
            {sidebar}
          </Box>
        )}
        <Box
          bg="gray.50"
          flex={1}
          h="100%"
          overflow="auto"
          py={[3, 6]}
          px={[3, 8]}
        >
          <Stack maxW={1440} mx="auto" spacing={[3, 6]}>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            {children}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
