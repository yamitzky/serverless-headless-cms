import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  ModalHeader
} from '@chakra-ui/react'
import React from 'react'
import { useI18n } from '~/hooks/i18n'

type Props = {
  onConfirm: () => void
  onCancel: () => void
  type: 'delete'
} & Omit<ModalProps, 'onClose'>

export const Confirm: React.FC<Props> = ({
  children,
  onCancel,
  onConfirm,
  type,
  ...props
}) => {
  const { t } = useI18n()
  return (
    <Modal {...props} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onCancel}>{t('cancel')}</Button>
          {type === 'delete' && (
            <Button onClick={onConfirm} colorScheme="red" ml={4}>
              {t('delete')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
