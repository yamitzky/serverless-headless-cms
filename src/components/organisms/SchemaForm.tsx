import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  useDisclosure,
  Textarea,
  Checkbox,
  Alert,
  AlertIcon,
  FormHelperText
} from '@chakra-ui/react'
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
  const { handleSubmit, formState, register, control, getValues } =
    useForm<Values>({
      defaultValues: values
    })
  const { errors } = formState

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useI18n()

  const [advanced, setAdvanced] = useState(false)

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
        <FormControl isInvalid={!!errors.name} isRequired={!isNew}>
          <FormLabel htmlFor="name">{t('displayName')}</FormLabel>
          <Input
            id="name"
            {...register('name', {
              required: !isNew
            })}
            defaultValue={values?.name}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
        {!isNew && (
          <>
            <Checkbox
              isChecked={advanced}
              onChange={(e) => setAdvanced(e.target.checked)}
            >
              高度な操作
            </Checkbox>
            {advanced && (
              <Stack borderWidth={1} p={4}>
                <Alert status="warning">
                  <AlertIcon />
                  {t('danger')}
                </Alert>
                <FormControl isInvalid={!!errors.fieldOrder}>
                  <FormLabel htmlFor="fieldOrder">{t('fieldOrder')}</FormLabel>
                  <Controller<Values>
                    name="fieldOrder"
                    control={control}
                    defaultValue={values?.fieldOrder}
                    rules={{
                      validate: (v) => {
                        if (typeof v !== 'object') {
                          return false
                        }
                        const fields = getValues('fields')
                        if (typeof fields === 'string') {
                          return false
                        }
                        return (v as string[]).every((f) => !!fields[f])
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        id="fieldOrder"
                        {...field}
                        value={
                          typeof field.value === 'string'
                            ? field.value
                            : (field.value as string[]).join(',')
                        }
                        onChange={(e) => {
                          try {
                            field.onChange(
                              e.target.value.split(',').map((v) => v.trim())
                            )
                          } catch (err) {
                            field.onChange(e.target.value)
                          }
                        }}
                      />
                    )}
                  />
                  <FormHelperText>{t('commaSeparated')}</FormHelperText>
                  <FormErrorMessage>
                    {/* @ts-expect-error */}
                    {errors.fieldOrder?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.fields}>
                  <FormLabel htmlFor="fields">{t('fields')}</FormLabel>
                  <Controller<Values>
                    name="fields"
                    control={control}
                    defaultValue={values?.fields}
                    rules={{
                      validate: (v) => typeof v === 'object'
                    }}
                    render={({ field }) => (
                      <Textarea
                        id="fields"
                        h="300px"
                        {...field}
                        value={
                          typeof field.value === 'string'
                            ? field.value
                            : JSON.stringify(field.value, null, 2)
                        }
                        onChange={(e) => {
                          try {
                            field.onChange(JSON.parse(e.target.value))
                          } catch (err) {
                            field.onChange(e.target.value)
                          }
                        }}
                      />
                    )}
                  />
                  <FormHelperText>{t('validJson')}</FormHelperText>
                  <FormErrorMessage>{errors.fields?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            )}
          </>
        )}
      </Stack>
      <Stack direction="row">
        <Button
          colorScheme="cyan"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          {isNew ? t('create') : t('save')}
        </Button>
        {onRemove && (
          <Button colorScheme="red" ml={4} onClick={onOpen}>
            {t('delete')}
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
