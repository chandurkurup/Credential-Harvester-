import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const json = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      "base64"
    ).toString("utf8");
    return JSON.parse(json);
  }
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }
  throw new Error("Firebase service account credentials are not available.");
}

// NEW: Use a function to lazily get the app instance

export function getFirebaseAdminApp(): App {
  // Check if an app is already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // If not, initialize it
  try {
    return initializeApp({ credential: cert(getServiceAccount()) });
  } catch (error) {
    // This is a safety catch for potential re-initialization errors
    // but the getApps() check above should prevent it.
    console.error("Error initializing Firebase Admin SDK:", error);
    // Re-throw if it's a critical, non-initialization error
    throw error;
  }
}

// NEW: Export a function to lazily get the Firestore DB
export function getDb() {
    return getFirestore(getFirebaseAdminApp());
}