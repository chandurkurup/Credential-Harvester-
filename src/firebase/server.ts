import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from './config';

let app: FirebaseApp;
let firestore: Firestore;

// This function is for use in SERVER-SIDE code only.
export function initializeFirebaseServer() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  firestore = getFirestore(app);
  
  return { firestore };
}
