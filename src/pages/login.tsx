import React from 'react'
import dynamic from 'next/dynamic'
import { SimpleTemplate } from '~/components/templates/SimpleTemplate'

const LoginForm = dynamic(
  async () => {
    const c = await import('~/components/organisms/LoginForm')
    return c.LoginForm
  },
  { ssr: false }
)

const LoginPage: React.FC = () => {
  return (
    <SimpleTemplate title="ログイン">
      <LoginForm />
    </SimpleTemplate>
  )
}

export default LoginPage
