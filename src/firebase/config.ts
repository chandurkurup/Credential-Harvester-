// This configuration is used for client-side Firebase initialization.
// It safely reads the configuration from a public environment variable.

// The variable is expected to be a JSON string. We parse it here.
const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
let firebaseConfig = {};

if (firebaseConfigString) {
  try {
    firebaseConfig = JSON.parse(firebaseConfigString);
  } catch (error) {
    console.error("Failed to parse NEXT_PUBLIC_FIREBASE_CONFIG. Make sure it's a valid JSON string.", error);
  }
} else if (typeof window !== 'undefined') {
  console.error(
    'Firebase config is missing. Please set NEXT_PUBLIC_FIREBASE_CONFIG in your environment variables.'
  );
}

export default firebaseConfig;
