// This configuration is used for client-side Firebase initialization.
// It safely reads the configuration from a public environment variable.

// The variable is expected to be a JSON string. We parse it here.
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  : {};

if (
  !firebaseConfig.apiKey &&
  typeof window !== 'undefined'
) {
  console.error(
    'Firebase config is missing. Please set NEXT_PUBLIC_FIREBASE_CONFIG in your environment variables.'
  );
}

export default firebaseConfig;
