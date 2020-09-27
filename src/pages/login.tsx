import React from 'react'
import dynamic from 'next/dynamic'
import { LoginTemplate } from '~/components/templates/LoginTemplate'
import { useI18n } from '~/hooks/i18n'

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
      <LoginForm />
    </LoginTemplate>
  )
}

export default LoginPage
