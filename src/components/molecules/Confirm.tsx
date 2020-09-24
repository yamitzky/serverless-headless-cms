import {
  Modal,
  IModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  ModalHeader
} from '@chakra-ui/core'
import React from 'react'

type Props = {
  onConfirm: () => void
  onCancel: () => void
  type: 'delete'
} & IModal

export const Confirm: React.FC<Props> = ({
  children,
  onCancel,
  onConfirm,
  type,
  ...props
}) => {
  return (
    <Modal {...props} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onCancel}>キャンセル</Button>
          {type === 'delete' && (
            <Button onClick={onConfirm} variantColor="red" ml={4}>
              削除
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
