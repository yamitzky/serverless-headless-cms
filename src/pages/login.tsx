import React from 'react'
import dynamic from 'next/dynamic'
import { LoginTemplate } from '~/components/templates/LoginTemplate'

const LoginForm = dynamic(
  async () => {
    const c = await import('~/components/organisms/LoginForm')
    return c.LoginForm
  },
  { ssr: false }
)

const LoginPage: React.FC = () => {
  return (
    <LoginTemplate title="ログイン">
      <LoginForm />
    </LoginTemplate>
  )
}

export default LoginPage
