import { Box, Icon, Link, LinkProps, useTheme } from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import React from 'react'

type Props = LinkProps

export const ExternalLink: React.FC<Props> = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <Link {...props} isExternal>
      <Box
        as="span"
        textDecoration={`underline ${theme.colors.gray[400]}`}
        _hover={{
          textDecoration: `underline ${theme.colors.gray[800]}`
        }}
      >
        {children}
      </Box>
      <Icon as={FaExternalLinkAlt} ml={1} />
    </Link>
  )
}
