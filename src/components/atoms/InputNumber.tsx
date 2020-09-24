import { Input } from '@chakra-ui/core'
import React from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

type Props = Omit<ControllerProps<'input'>, 'render'>

export const InputNumber: React.FC<Props> = ({ as, ...rest }) => {
  return (
    <Controller
      {...rest}
      render={(props) => (
        <Input
          {...props}
          type="number"
          onChange={(e: any) =>
            props.onChange(e.target.value ? Number(e.target.value) : null)
          }
        />
      )}
    />
  )
}
