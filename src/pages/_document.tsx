import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '~/theme'

class MyDocument extends Document<{ lang: any }> {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps, lang: ctx.query.lng }
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
