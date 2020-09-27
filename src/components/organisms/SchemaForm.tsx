import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  useDisclosure
} from '@chakra-ui/core'
import { ResourceSchema } from '~/hooks/app'
import { Confirm } from '~/components/molecules/Confirm'
import { useI18n } from '~/hooks/i18n'

type Values = ResourceSchema & { id?: string }

type Props = {
  isNew?: boolean
  currentIds?: string[]
  values?: Partial<Values>
  onSubmit: (values: Values) => void
  onRemove?: () => void
}

export const SchemaForm: React.FC<Props> = ({
  currentIds,
  values,
  onSubmit,
  isNew,
  onRemove,
  ...props
}) => {
  const { handleSubmit, errors, formState, register } = useForm<Values>({
    defaultValues: values
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useI18n()

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
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
          {t('confirmDelete')}
        </Confirm>
      )}
      <Stack spacing={4}>
        {isNew && (
          <FormControl isInvalid={!!errors.id} isRequired>
            <FormLabel htmlFor="id">ID</FormLabel>
            <Input
              name="id"
              id="id"
              ref={register({
                required: true,
                pattern: /[a-zA-Z0-9_-]+/,
                validate: (v) => !currentIds || !currentIds.includes(v)
              })}
              defaultValue={values?.id}
            />
            <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.name} isRequired={!isNew}>
          <FormLabel htmlFor="name">{t('displayName')}</FormLabel>
          <Input
            name="name"
            id="name"
            ref={register({
              required: !isNew
            })}
            defaultValue={values?.name}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction="row">
        <Button
          variantColor="cyan"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          {isNew ? t('create') : t('save')}
        </Button>
        {onRemove && (
          <Button variantColor="red" ml={4} onClick={onOpen}>
            {t('delete')}
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
