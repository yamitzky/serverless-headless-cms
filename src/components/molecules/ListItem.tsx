import {
  Box,
  CloseButton,
  Heading,
  Stack,
  StackProps,
  useDisclosure
} from '@chakra-ui/core'
import React from 'react'
import { Link } from '~/components/atoms/Link'
import { Confirm } from '~/components/molecules/Confirm'
import { useI18n } from '~/hooks/i18n'

type Props = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  href?: string
  onRemove?: () => void
} & StackProps

export const ListItem: React.FC<Props> = ({
  title,
  subtitle,
  href,
  onRemove,
  children,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useI18n()
  return (
    <Stack
      {...props}
      shadow="sm"
      p={4}
      borderWidth={1}
      borderRadius={4}
      spacing={4}
    >
      {onRemove && (
        <Confirm
          type="delete"
          isOpen={isOpen}
          onCancel={onClose}
          onConfirm={() => {
            onRemove()
            onClose()
          }}
        >
          {t('confirmDelete', title as string)}
        </Confirm>
      )}
      <Stack direction="row" justifyContent="space-between">
        <Heading size="lg">
          {href ? (
            <Link href={href} textDecor="none">
              {title}
              {subtitle && (
                <Box as="span" ml={4} fontSize="80%" color="gray.500">
                  {subtitle}
                </Box>
              )}
            </Link>
          ) : (
            <Box>
              {title}
              {subtitle && (
                <Box as="span" ml={4} fontSize="80%" color="gray.500">
                  {subtitle}
                </Box>
              )}
            </Box>
          )}
        </Heading>
        {onRemove && <CloseButton size="sm" onClick={onOpen} />}
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  )
}
