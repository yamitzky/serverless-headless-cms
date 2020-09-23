import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Select,
  Textarea
} from '@chakra-ui/core'
import { Field, Resource, visibilities, visibilityLabel } from '~/hooks/app'

type Values = Resource

type Props = {
  isNew?: boolean
  values?: Partial<Values>
  fields: (Field & { id: string })[]
  onSubmit: (values: Values) => void
}

export const ResourceForm: React.FC<Props> = ({
  isNew,
  values,
  onSubmit,
  fields,
  ...props
}) => {
  const { handleSubmit, errors, formState, register } = useForm<Values>({
    defaultValues: values
  })

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        {fields.map((field) => (
          <FormControl key={field.id} isInvalid={!!errors[field.id]}>
            <FormLabel htmlFor={field.id}>{field.name}</FormLabel>
            {field.type === 'longtext' ? (
              <Textarea
                name={field.id}
                id={field.id}
                ref={register()}
                defaultValue={values?.[field.id]}
              />
            ) : (
              <Input
                name={field.id}
                id={field.id}
                ref={register()}
                defaultValue={values?.[field.id]}
              />
            )}
            <FormErrorMessage>{errors[field.id]?.message}</FormErrorMessage>
          </FormControl>
        ))}
        <FormControl isInvalid={!!errors.visibility}>
          <FormLabel htmlFor="visibility">公開設定</FormLabel>
          <Select
            name="visibility"
            id="visibility"
            ref={register()}
            defaultValue={values?.visibility || 'public'}
          >
            {visibilities.map((v) => (
              <option key={v} value={v}>
                {visibilityLabel[v]}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.visibility?.message}</FormErrorMessage>
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
