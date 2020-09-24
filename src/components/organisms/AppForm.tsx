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

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">表示名</FormLabel>
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
          {isNew ? '作成' : '保存'}
        </Button>
      </Stack>
    </Stack>
  )
}
