import {
  Box,
  Flex,
  IconButton,
  Stack,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
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

  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  const bgSidebar = useColorModeValue('gray.100', 'gray.800')
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Flex h="100vh" direction="column" color={textColor}>
      <Header
        action={
          sidebar ? (
            <>
              <IconButton
                aria-label="Show menu"
                icon={<FaBars />}
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
            bg={bgSidebar}
            borderRightWidth={1}
          >
            {sidebar}
          </Box>
        )}
        <Box
          bg={bgColor}
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
