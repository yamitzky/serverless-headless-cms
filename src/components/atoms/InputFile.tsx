import { Box, Image, Spinner } from '@chakra-ui/react'
import React, { InputHTMLAttributes, useState } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { ExternalLink } from '~/components/molecules/ExternalLink'
import { useFileActions } from '~/hooks/file'

type Props = Omit<ControllerProps<any>, 'render'> & {
  onChange?: (v: string) => void
  value?: string
} & InputHTMLAttributes<any>

export const InputFile: React.FC<Props> = ({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...rest
}) => {
  const { upload } = useFileActions()
  const [loading, setLoading] = useState(false)
  return (
    <Controller
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Box>
          <input
            {...rest}
            type="file"
            onChange={async (e: any) => {
              const file = e.target.files?.[0]
              if (file) {
                setLoading(true)
                try {
                  const url = await upload(file)
                  field.onChange?.(url)
                } finally {
                  setLoading(false)
                }
              }
            }}
          />
          {loading ? (
            <Box mt={2}>
              <Spinner />
            </Box>
          ) : field.value ? (
            <Box mt={2}>
              <Image src={field.value} maxH={200} w="auto" />
              <ExternalLink href={field.value}>URL</ExternalLink>
            </Box>
          ) : null}
        </Box>
      )}
    />
  )
}
