// This file is designated for server-side use only.
import 'server-only';

// This function securely accesses and parses the service account credentials.
// It is designed to be called only from server-side code (like Server Actions).
export function getServiceAccount() {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountString) {
    console.error('getServiceAccount: FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    return null;
  }

  try {
    // Parse the JSON string from the environment variable.
    const serviceAccount = JSON.parse(serviceAccountString);
    return serviceAccount;
  } catch (error: any) {
    console.error('getServiceAccount: Error parsing FIREBASE_SERVICE_ACCOUNT. Make sure it is a valid JSON object in your .env file.', error.message);
    return null;
  }
}
