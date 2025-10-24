'use server';

// This function is no longer needed as we are not connecting to a database.
// function initializeFirebaseAdmin() { ... }

// --- Server Action to Capture Credentials ---

export async function captureCredentials(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Simulating credential capture for:', username);

  if (!username || !password) {
    console.log('Submission failed: Missing username or password.');
    return { success: false, message: 'Username and password are required.' };
  }

  // Since we are not saving the data, we just log that we received it
  // and immediately return success. The front-end will behave as before,
  // showing the "expired link" dialog to the user.
  console.log('Successfully simulated submission. No data was stored.');
  return { success: true, message: 'Submission successful.' };
}
