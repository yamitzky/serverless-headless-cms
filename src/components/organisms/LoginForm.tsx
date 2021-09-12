// TODO: Remove dependency to Firebase

import React from 'react'
import { Stack } from '@chakra-ui/react'
import { auth as firebaseui } from 'firebaseui'
import { firebase } from '~/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { config } from '~/config'

const providerMap: Record<string, string> = {
  google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  github: firebase.auth.GithubAuthProvider.PROVIDER_ID,
  email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  phone: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  anonymous: firebaseui.AnonymousAuthProvider.PROVIDER_ID
}

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/admin',
  signInOptions: config.authMethods.map((a) => providerMap[a])
}

export const LoginForm: React.FC = ({ ...props }) => {
  return (
    <Stack spacing={6} {...props}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Stack>
  )
}
