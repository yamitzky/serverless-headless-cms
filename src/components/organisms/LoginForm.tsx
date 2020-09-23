// TODO: Remove dependency to Firebase

import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormControl,
  Button,
  Input,
  FormLabel,
  FormErrorMessage,
  Stack
} from '@chakra-ui/core'
import { auth as firebaseui } from 'firebaseui'
import { firebase } from '~/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

type Values = {
  email: string
  password: string
}

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/admin/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.AnonymousAuthProvider.PROVIDER_ID
  ]
}

export const LoginForm: React.FC = ({ ...props }) => {
  return (
    <Stack spacing={6} {...props}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Stack>
  )
}
