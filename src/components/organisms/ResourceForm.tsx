import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Select,
  Textarea,
  FormHelperText,
  useDisclosure
} from '@chakra-ui/react'
import { Field, ResourceSchema } from '~/hooks/app'
import { Resource } from '~/hooks/resource'
import dynamic from 'next/dynamic'
import { InputNumber } from '~/components/atoms/InputNumber'
import { useI18n } from '~/hooks/i18n'
import { InputFile } from '~/components/atoms/InputFile'
import { Confirm } from '~/components/molecules/Confirm'
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false
})

type Values = Resource

type Props = {
  isNew?: boolean
  values?: Partial<Values>
  allSchema: Record<string, ResourceSchema>
  fields: (Field & { id: string })[]
  onSubmit: (values: Values) => void
  onRemove?: () => void
  fetchAllReference: (rid: string) => Promise<Resource[]>
  fetchReference?: (rid: string, iid: string) => Promise<Resource>
}

export const ResourceForm: React.FC<Props> = ({
  isNew,
  values,
  onSubmit,
  fetchAllReference,
  fetchReference,
  allSchema,
  fields,
  onRemove,
  ...props
}) => {
  const { t } = useI18n()
  const { handleSubmit, formState, register, control } = useForm<Values>({
    defaultValues: values
  })
  const { errors } = formState

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [reference, setReference] = useState<Record<string, Resource[]>>({})
  const [allFetched, setAllFetched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState<
    Record<string, Record<string, boolean>>
  >({})
  const handleFetch = useCallback(
    async (rid: string) => {
      if (!allFetched[rid]) {
        const refs = await fetchAllReference(rid)
        setReference((curr) => ({
          ...curr,
          [rid]: refs
        }))
        setAllFetched((curr) => ({
          ...curr,
          [rid]: true
        }))
      }
    },
    [fetchAllReference, allFetched]
  )
  useEffect(() => {
    ;(async () => {
      if (values) {
        for (const field of fields) {
          if (field.type === 'reference') {
            const rid = field.referTo!
            const iid = values[field.id]
            if (rid && iid && !loading[rid]?.[iid] && !allFetched[rid]) {
              setLoading((curr) => ({
                ...curr,
                [rid]: {
                  ...curr[rid],
                  [iid]: true
                }
              }))
              const ref = await fetchReference?.(rid, iid)
              setReference((curr) => ({
                ...curr,
                [rid]: [...(curr[rid] || []), ref!]
              }))
            }
          }
        }
      }
    })()
  }, [fields, values, fetchReference, loading, allFetched])

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
        {fields.map((field) => {
          return (
            <FormControl
              key={field.id}
              isInvalid={!!errors[field.id]}
              isRequired={field.required}
            >
              <FormLabel htmlFor={field.id}>{field.name}</FormLabel>
              {field.type === 'longtext' ? (
                <Textarea
                  placeholder={field.placeholder}
                  id={field.id}
                  {...register(field.id, {
                    required: field.required,
                    minLength: field.minLength,
                    maxLength: field.maxLength
                  })}
                  defaultValue={values?.[field.id] || ''}
                />
              ) : field.type === 'richtext' ? (
                <Controller
                  control={control}
                  render={({ field: props }) => (
                    <ReactQuill
                      theme="snow"
                      id={field.id}
                      placeholder={field.placeholder}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ color: [] }, { background: [] }],
                          [{ script: 'super' }, { script: 'sub' }],
                          ['blockquote', 'code-block'],
                          [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' }
                          ],
                          ['link', 'image', 'video'],
                          [{ align: [] }, 'direction'],
                          ['clean']
                        ]
                      }}
                      {...props}
                    />
                  )}
                  name={field.id}
                  defaultValue={values?.[field.id] || ''}
                />
              ) : field.type === 'select' ? (
                <Select
                  id={field.id}
                  {...register(field.id, {
                    required: field.required
                  })}
                  defaultValue={values?.[field.id]}
                >
                  <option value="">{t('pleaseSelect')}</option>
                  {field.options?.split('\n').map((o) => (
                    <option value={o} key={o}>
                      {o}
                    </option>
                  ))}
                </Select>
              ) : field.type === 'reference' ? (
                <Select
                  id={field.id}
                  {...register(field.id, {
                    required: field.required
                  })}
                  defaultValue={values?.[field.id]}
                  onClick={() => handleFetch(field.referTo!)}
                >
                  {!values?.[field.id] && (
                    <option value="">{t('pleaseSelect')}</option>
                  )}
                  {reference[field.referTo!]?.map((res) => (
                    <option value={res.id} key={res.id}>
                      {res[allSchema[field.referTo!]?.fieldOrder[0]] || res.id}
                    </option>
                  ))}
                </Select>
              ) : field.type === 'number' ? (
                <InputNumber
                  name={field.id}
                  id={field.id}
                  placeholder={field.placeholder}
                  control={control}
                  defaultValue={values?.[field.id] || ''}
                  rules={{
                    required: field.required,
                    min: field.min,
                    max: field.max
                  }}
                />
              ) : field.type === 'file' ? (
                <InputFile
                  name={field.id}
                  id={field.id}
                  control={control}
                  defaultValue={values?.[field.id] || ''}
                  rules={{
                    required: field.required
                  }}
                />
              ) : (
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  {...register(field.id, {
                    required: field.required,
                    pattern: field.pattern
                      ? new RegExp(field.pattern)
                      : undefined,
                    minLength: field.minLength,
                    maxLength: field.maxLength
                  })}
                  defaultValue={values?.[field.id] || ''}
                />
              )}
              {field.description && (
                <FormHelperText>{field.description}</FormHelperText>
              )}
              <FormErrorMessage>{errors[field.id]?.message}</FormErrorMessage>
            </FormControl>
          )
        })}
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
