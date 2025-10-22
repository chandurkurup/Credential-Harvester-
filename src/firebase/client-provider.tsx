'use client';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const { app, auth, firestore } = initializeFirebase();
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}

    