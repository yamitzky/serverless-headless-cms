import { Box, Flex, FlexProps } from '@chakra-ui/core'
import React from 'react'
import { Header } from '~/components/organisms/Header'

type Props = FlexProps

export const TopTemplate: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Flex h="100vh" direction="column" color="gray.700" {...props}>
      <Header boxShadow="md" zIndex={'sticky' as any} />
      <Box
        flex={1}
        h="100%"
        overflow="auto"
        py={[4, 6]}
        px={[4, 8]}
        pb={[10, 6]}
      >
        {children}
      </Box>
    </Flex>
  )
}
