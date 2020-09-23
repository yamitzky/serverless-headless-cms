import { Link as ChakraLink, LinkProps, useTheme } from '@chakra-ui/core'
import React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type Props = Omit<NextLinkProps, 'passHref'> & LinkProps

export const Link: React.FC<Props> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      passHref
    >
      <ChakraLink
        textDecoration={`underline ${theme.colors.gray[400]}`}
        {...props}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
