import { theme as chakraTheme, ITheme } from '@chakra-ui/core'

// Let's say you want to add custom colors
export const theme: ITheme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors
  }
}
