import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input
} from '@chakra-ui/react'
import { App } from '~/hooks/app'
import { useI18n } from '~/hooks/i18n'

type Values = App

type Props = {
  isNew?: boolean
  values?: Partial<Values>
  onSubmit: (values: Values) => void
}

export const AppForm: React.FC<Props> = ({
  isNew,
  values,
  onSubmit,
  ...props
}) => {
  const { handleSubmit, formState, register } = useForm<Values>({
    defaultValues: values
  })
  const { errors } = formState
  const { t } = useI18n()

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">{t('displayName')}</FormLabel>
          <Input
            id="name"
            {...register('name', { required: true })}
            defaultValue={values?.name}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction="row">
        <Button
          colorScheme="cyan"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          {isNew ? t('create') : t('save')}
        </Button>
      </Stack>
    </Stack>
  )
}
