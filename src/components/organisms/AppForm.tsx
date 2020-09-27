import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input
} from '@chakra-ui/core'
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
  const { handleSubmit, errors, formState, register } = useForm<Values>({
    defaultValues: values
  })
  const { t } = useI18n()

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">{t('displayName')}</FormLabel>
          <Input
            name="name"
            id="name"
            ref={register({ required: true })}
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
      </Stack>
    </Stack>
  )
}
