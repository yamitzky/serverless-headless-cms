import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Header } from '~/components/organisms/Header'

type Props = FlexProps

export const TopTemplate: React.FC<Props> = ({ children, ...props }) => {
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  return (
    <Flex h="100vh" direction="column" color={textColor} {...props}>
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
