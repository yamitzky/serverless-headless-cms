import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  components: {
    Button: {
      variants: {
        solid: (props: any) => {
          const { colorScheme: c } = props
          const base = baseTheme.components.Button.variants.solid(props)
          if (c === 'cyan') {
            return {
              bg: `cyan.600`,
              color: 'white',
              hoverBg: `cyan.600`,
              activeBg: `cyan.700`
            }
          } else {
            return base
          }
        }
      }
    }
  }
})

export { theme }
