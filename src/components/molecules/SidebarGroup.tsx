import { Box, Flex, Heading, Stack } from '@chakra-ui/core'
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
  return (
    <Stack {...props}>
      <Flex alignItems="center">
        <Flex alignItems="center" flex={1}>
          <Box as={icon} mr={2} size="20px" />
          <Heading fontSize="md" color="gray.600">
            {title}
          </Heading>
        </Flex>
        {action && <Box>{action}</Box>}
      </Flex>
      <Stack>{children}</Stack>
    </Stack>
  )
}
