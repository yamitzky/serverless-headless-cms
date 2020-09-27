import { Box, BoxProps } from '@chakra-ui/core'
import React from 'react'

type Props = BoxProps

export const Strong: React.FC<Props> = (props) => {
  return <Box as="strong" fontWeight="bold" color="cyan.600" {...props} />
}
