import React from 'react'
import dynamic from 'next/dynamic'
import { LoginTemplate } from '~/components/templates/LoginTemplate'
import { useI18n } from '~/hooks/i18n'
import { Auth } from 'aws-amplify'
import { Button } from '@chakra-ui/core'

const LoginForm = dynamic(
  async () => {
    const c = await import('~/components/organisms/LoginForm')
    return c.LoginForm
  },
  { ssr: false }
)

const LoginPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <LoginTemplate title={t('login')}>
      <Button onClick={() => Auth.federatedSignIn()}>{t('login')}</Button>
      <LoginForm />
    </LoginTemplate>
  )
}

export default LoginPage
