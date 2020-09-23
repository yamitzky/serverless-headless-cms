import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Select
} from '@chakra-ui/core'
import { Field, fieldTypeLabel, fieldTypes } from '~/hooks/app'

type Values = Field & { id?: string }

type Props = {
  isNew?: boolean
  currentIds?: string[]
  values?: Partial<Values>
  onSubmit: (values: Values) => void
}

export const FieldForm: React.FC<Props> = ({
  values,
  onSubmit,
  isNew,
  currentIds,
  ...props
}) => {
  const { handleSubmit, errors, formState, register } = useForm<Values>({
    defaultValues: values
  })

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        {isNew && (
          <FormControl isInvalid={!!errors.id}>
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
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">表示名</FormLabel>
          <Input
            name="name"
            id="name"
            ref={register()}
            defaultValue={values?.name}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.type} isRequired>
          <FormLabel htmlFor="type">種類</FormLabel>
          <Select
            name="type"
            id="type"
            ref={register({
              required: true
            })}
            defaultValue={values?.type || 'text'}
          >
            {fieldTypes.map((f) => (
              <option key={f} value={f}>
                {fieldTypeLabel[f]}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack direction="row">
        <Button
          variantColor="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          {isNew ? '作成' : '保存'}
        </Button>
      </Stack>
    </Stack>
  )
}
