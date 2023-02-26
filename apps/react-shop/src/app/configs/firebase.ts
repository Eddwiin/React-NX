import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';

const FIREBASE_CONFIG = {
    apiKey: process.env.NX_FIREBASE_API_KEY,
    authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.NX_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NX_FIREBASE_APP_ID,
    measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(FIREBASE_CONFIG)
console.log("FIREBASE_CONFIG", FIREBASE_CONFIG);
export const db = getDatabase(app);
