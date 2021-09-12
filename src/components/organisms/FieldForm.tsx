import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Select,
  Checkbox,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea
} from '@chakra-ui/react'
import { Field, fieldTypes, ResourceSchema } from '~/hooks/app'
import { InputNumber } from '~/components/atoms/InputNumber'
import { useI18n } from '~/hooks/i18n'

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
  const { t } = useI18n()
  const { handleSubmit, formState, register, watch, control } = useForm<Values>(
    {
      defaultValues: values
    }
  )
  const { errors } = formState
  const { type } = watch()

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        {isNew && (
          <FormControl isInvalid={!!errors.id} isRequired>
            <FormLabel htmlFor="id">ID</FormLabel>
            <Input
              id="id"
              {...register('id', {
                required: true,
                pattern: /[a-zA-Z0-9_-]+/,
                validate: (v) => !currentIds || !v || !currentIds.includes(v)
              })}
              defaultValue={values?.id}
            />
            <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">{t('displayName')}</FormLabel>
          <Input id="name" {...register('name')} defaultValue={values?.name} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.type} isRequired>
          <FormLabel htmlFor="type">{t('type')}</FormLabel>
          <Select
            id="type"
            {...register('type', {
              required: true
            })}
            defaultValue={values?.type || 'text'}
          >
            {fieldTypes.map((f) => (
              <option key={f} value={f}>
                {t(f)}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>
        {type === 'select' && (
          <FormControl isInvalid={!!errors.referTo} isRequired>
            <FormLabel htmlFor="options">{t('options')}</FormLabel>
            <Textarea
              id="options"
              {...register('options', {
                required: true
              })}
              defaultValue={values?.options}
            />
            <FormErrorMessage>{errors.options?.message}</FormErrorMessage>
          </FormControl>
        )}
        {type === 'reference' && (
          <FormControl isInvalid={!!errors.referTo} isRequired>
            <FormLabel htmlFor="referTo">{t('referTo')}</FormLabel>
            <Select
              id="referTo"
              {...register('referTo', {
                required: true
              })}
              defaultValue={values?.referTo}
            >
              <option disabled>{t('pleaseSelect')}</option>
              {allSchema.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.referTo?.message}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.required}>
          <Checkbox id="required" {...register('required')}>
            {t('required')}
          </Checkbox>
          <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
        </FormControl>
        {type === 'text' && (
          <FormControl isInvalid={!!errors.pattern}>
            <FormLabel htmlFor="pattern">{t('pattern')}</FormLabel>
            <InputGroup>
              <InputLeftElement>/</InputLeftElement>
              <Input
                id="pattern"
                {...register('pattern')}
                defaultValue={values?.pattern}
              />
              <InputRightElement>/</InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.pattern?.message}</FormErrorMessage>
          </FormControl>
        )}
        {type === 'number' && (
          <FormControl isInvalid={!!errors.min}>
            <FormLabel htmlFor="min">{t('min')}</FormLabel>
            <InputNumber
              control={control}
              name="min"
              id="min"
              defaultValue={values?.min ?? null}
            />
            <FormErrorMessage>{errors.min?.message}</FormErrorMessage>
          </FormControl>
        )}
        {type === 'number' && (
          <FormControl isInvalid={!!errors.max}>
            <FormLabel htmlFor="max">{t('max')}</FormLabel>
            <InputNumber
              control={control}
              name="max"
              id="max"
              defaultValue={values?.max ?? null}
            />
            <FormErrorMessage>{errors.max?.message}</FormErrorMessage>
          </FormControl>
        )}
        {(type === 'text' || type === 'longtext') && (
          <FormControl isInvalid={!!errors.minLength}>
            <FormLabel htmlFor="minLength">{t('minLength')}</FormLabel>
            <InputNumber
              control={control}
              name="minLength"
              id="minLength"
              defaultValue={values?.minLength ?? null}
            />
            <FormErrorMessage>{errors.minLength?.message}</FormErrorMessage>
          </FormControl>
        )}
        {(type === 'text' || type === 'longtext') && (
          <FormControl isInvalid={!!errors.maxLength}>
            <FormLabel htmlFor="maxLength">{t('maxLength')}</FormLabel>
            <InputNumber
              control={control}
              name="maxLength"
              id="maxLength"
              defaultValue={values?.maxLength ?? null}
            />
            <FormErrorMessage>{errors.maxLength?.message}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.placeholder}>
          <FormLabel htmlFor="placeholder">{t('placeholder')}</FormLabel>
          <Input
            id="placeholder"
            {...register('placeholder')}
            defaultValue={values?.placeholder}
          />
          <FormErrorMessage>{errors.placeholder?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">{t('description')}</FormLabel>
          <Input
            id="description"
            {...register('description')}
            defaultValue={values?.description}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
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
