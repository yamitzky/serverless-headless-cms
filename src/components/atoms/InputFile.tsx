import { Box, Image, Spinner } from '@chakra-ui/core'
import React, { useState } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'
import { ExternalLink } from '~/components/molecules/ExternalLink'
import { useFileActions } from '~/hooks/file'

type Props = Omit<ControllerProps<'input'>, 'render'> & {
  onChange?: (v: string) => void
  value?: string
}

export const InputFile: React.FC<Props> = ({ as, ...rest }) => {
  const { upload } = useFileActions()
  const [loading, setLoading] = useState(false)
  return (
    <Controller
      {...rest}
      render={(props) => (
        <Box>
          <input
            type="file"
            onChange={async (e: any) => {
              const file = e.target.files?.[0]
              if (file) {
                setLoading(true)
                try {
                  const url = await upload(file)
                  props.onChange?.(url)
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
          ) : props.value ? (
            <Box mt={2}>
              <Image src={props.value} maxH={200} w="auto" />
              <ExternalLink href={props.value}>URL</ExternalLink>
            </Box>
          ) : null}
        </Box>
      )}
    />
  )
}
