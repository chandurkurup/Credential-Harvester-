import { initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from './config';

export * from './provider';
export * from './client-provider';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  try {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  } catch (e) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
    (global as any)._firebaseApp = app;
  }
  return { app, auth, firestore };
}

    