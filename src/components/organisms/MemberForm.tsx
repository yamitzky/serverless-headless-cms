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
} from '@chakra-ui/core'
import { Member } from '~/hooks/member'
import { Link } from '~/components/atoms/Link'

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
  const { handleSubmit, errors, formState, register } = useForm<Values>({
    defaultValues: values
  })

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} as="form" spacing={8} {...props}>
      <Stack spacing={4}>
        {isNew && (
          <FormControl isInvalid={!!errors.id} isRequired>
            <FormLabel htmlFor="id">ユーザーID</FormLabel>
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
            <FormHelperText>
              ユーザー ID は招待するユーザーに教えてもらってください。ユーザー
              ID は<Link href="/admin">トップページ</Link>に記載されています。
            </FormHelperText>
            <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">名前</FormLabel>
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
          {isNew ? '招待' : '更新'}
        </Button>
      </Stack>
    </Stack>
  )
}
