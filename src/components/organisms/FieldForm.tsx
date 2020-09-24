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
import { Field, fieldTypeLabel, fieldTypes, ResourceSchema } from '~/hooks/app'

type Values = Field & { id?: string }

type Props = {
  isNew?: boolean
  allSchema: (ResourceSchema & { id: string })[]
  currentIds?: string[]
  values?: Partial<Values>
  onSubmit: (values: Values) => void
}

export const FieldForm: React.FC<Props> = ({
  values,
  onSubmit,
  isNew,
  allSchema,
  currentIds,
  ...props
}) => {
  const { handleSubmit, errors, formState, register, watch } = useForm<Values>({
    defaultValues: values
  })
  const { type } = watch()

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
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
        {type === 'reference' && (
          <FormControl isInvalid={!!errors.referTo} isRequired>
            <FormLabel htmlFor="referTo">参照項目</FormLabel>
            <Select
              name="referTo"
              id="referTo"
              ref={register({
                required: true
              })}
              defaultValue={values?.referTo}
            >
              <option disabled>選択してください</option>
              {allSchema.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.referTo?.message}</FormErrorMessage>
          </FormControl>
        )}
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
