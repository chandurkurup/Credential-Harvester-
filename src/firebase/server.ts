import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from './config';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function is for use in SERVER-SIDE code only (e.g., Genkit flows).
export function initializeFirebaseServer() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
  firestore = getFirestore(app);
  
  return { app, auth, firestore };
}
