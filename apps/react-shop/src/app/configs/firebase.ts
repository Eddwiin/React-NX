import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const FIREBASE_CONFIG = {
    apiKey: process.env.NX_FIREBASE_API_KEY,
    authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NX_FIREBASE_SENDER_ID,
    appId: process.env.NX_FIREBASE_APP_ID,
    measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID
}

const firebaseApp = initializeApp(FIREBASE_CONFIG)

export const auth = getAuth(firebaseApp)