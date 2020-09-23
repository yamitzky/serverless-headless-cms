import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon
} from '@chakra-ui/core'
import React from 'react'
import NextLink from 'next/link'

export type Breadcrumb = {
  href?: string
  title: string
}

type Props = {
  items: Breadcrumb[]
}

export const Breadcrumbs: React.FC<Props> = ({ items, ...props }) => {
  return (
    <Breadcrumb
      separator={<Icon color="gray.300" name="chevron-right" />}
      {...props}
    >
      {items.map(({ title, href }, i) => (
        <BreadcrumbItem key={i} isCurrentPage={i === items.length - 1}>
          {href ? (
            <NextLink href={href} passHref>
              <BreadcrumbLink>{title}</BreadcrumbLink>
            </NextLink>
          ) : (
            <Box>{title}</Box>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
