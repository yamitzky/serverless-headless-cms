import { Box, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  title: React.ReactNode
  icon: IconType
  action?: React.ReactNode
}

export const SidebarGroup: React.FC<Props> = ({
  title,
  icon,
  action,
  children,
  ...props
}) => {
  const headingColor = useColorModeValue('gray.600', 'whiteAlpha.700')
  return (
    <Stack {...props}>
      <Flex alignItems="center">
        <Flex alignItems="center" flex={1}>
          <Box as={icon} mr={2} boxSize="20px" />
          <Heading fontSize="md" color={headingColor}>
            {title}
          </Heading>
        </Flex>
        {action && <Box>{action}</Box>}
      </Flex>
      <Stack>{children}</Stack>
    </Stack>
  )
}
