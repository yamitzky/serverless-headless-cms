import {
  Box,
  Icon,
  Link,
  LinkProps,
  PseudoBox,
  useTheme
} from '@chakra-ui/core'
import React from 'react'

type Props = LinkProps

export const ExternalLink: React.FC<Props> = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <Link {...props} isExternal>
      <PseudoBox
        as="span"
        textDecoration={`underline ${theme.colors.gray[400]}`}
        _hover={{
          textDecoration: `underline ${theme.colors.gray[800]}`
        }}
      >
        {children}
      </PseudoBox>
      <Icon name="external-link" ml={1} />
    </Link>
  )
}
