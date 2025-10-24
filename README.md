# Firebase Studio

This is a NextJS starter in Firebase Studio. To get started, take a look at `src/app/page.tsx`.

## Local Development Setup

To connect to your Firebase project for local development, you need to provide your service account credentials.

### 1. Generate a Service Account Key

1.  Go to your **Firebase Project Settings** in the [Firebase Console](https://console.firebase.google.com).
2.  Navigate to the **Service accounts** tab.
3.  Click the **Generate new private key** button. This will download a JSON file.

**Warning:** Treat this file like a password. Do not share it or commit it to your repository.

### 2. Configure Environment Variable

1.  Open the downloaded JSON file and copy its entire contents.
2.  Open the `.env` file in your project's root directory.
3.  Paste the entire JSON object as a single line into the `FIREBASE_SERVICE_ACCOUNT` variable, making sure it is enclosed in double quotes.

**Example `.env` file:**
```
FIREBASE_SERVICE_ACCOUNT="{ \"type\": \"service_account\", \"project_id\": \"your-project-id\", ... }"
```

Now, when you run the app locally, it will be able to securely connect to your Firestore database.
