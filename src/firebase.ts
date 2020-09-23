import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))
  }
} else {
  console.warn('NEXT_PUBLIC_FIREBASE_CONFIG not set')
}

export { firebase }
