import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  FormHelperText
} from '@chakra-ui/react'
import { Member } from '~/hooks/member'
import { Link } from '~/components/atoms/Link'
import { useI18n } from '~/hooks/i18n'

type Values = Member

type Props = {
  isNew?: boolean
  currentIds?: string[]
  values?: Partial<Values>
  onSubmit: (values: Values) => void
}

export const MemberForm: React.FC<Props> = ({
  values,
  onSubmit,
  isNew,
  currentIds,
  ...props
}) => {
  const { t } = useI18n()
  const { handleSubmit, formState, register } = useForm<Values>({
    defaultValues: values
  })
  const { errors } = formState

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        {isNew && (
          <FormControl isInvalid={!!errors.id} isRequired>
            <FormLabel htmlFor="id">{t('userId')}</FormLabel>
            <Input
              id="id"
              {...register('id', {
                required: true,
                pattern: /[a-zA-Z0-9_-]+/,
                validate: (v) => !currentIds || !currentIds.includes(v)
              })}
              defaultValue={values?.id}
            />
            <FormHelperText>
              {t(
                'invitationMessage',
                <Link href="/admin">{t('topPage')}</Link>
              )}
            </FormHelperText>
            <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
          </FormControl>
        )}
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
          {isNew ? t('invitation') : t('update')}
        </Button>
      </Stack>
    </Stack>
  )
}
