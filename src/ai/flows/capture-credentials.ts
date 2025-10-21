'use server';
/**
 * @fileOverview A flow to capture user credentials.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';

export async function captureCredentials(
  input: CredentialsInput
): Promise<{success: boolean}> {
  return captureCredentialsFlow(input);
}

const captureCredentialsFlow = ai.defineFlow(
  {
    name: 'captureCredentialsFlow',
    inputSchema: CredentialsInputSchema,
    outputSchema: z.object({success: z.boolean()}),
  },
  async (input: CredentialsInput) => {
    console.log('Captured Credentials:', input);
    // In a real application, you would save this to a database.
    // For this prototype, we are just logging it to the server console.
    return {success: true};
  }
);
