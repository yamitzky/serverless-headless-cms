import { Input } from '@chakra-ui/react'
import React, { ComponentProps } from 'react'
import { Controller, ControllerProps } from 'react-hook-form'

type Props = Omit<ControllerProps<any>, 'render'> &
  Omit<ComponentProps<typeof Input>, 'defaultValue'> & {
    defaultValue?: number | null
  }

export const InputNumber: React.FC<Props> = ({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...rest}
          {...field}
          type="number"
          onChange={(e: any) =>
            field.onChange(e.target.value ? Number(e.target.value) : null)
          }
        />
      )}
    />
  )
}
