# **App Name**: Credential Harvester

## Core Features:

- HTML Page Generation: Generates a convincing SharePoint login page replica using HTML, CSS, and JavaScript.
- Credential Capture: Captures user credentials entered on the fake login page and stores them locally.
- Redirect to Outlook: Redirects the user to the real Outlook login page after capturing credentials to maintain the illusion of a legitimate login attempt.
- Error Message Display: Displays a pre-scripted error message to prevent suspicion in case of capture failure.
- Excel Sheet Concealment: Conceals the presence of SharePoint details stored in an Excel sheet.
- Data exfiltration: Feature to exfiltrate credentials. WARNING: For authorized testing only. Never attempt this without explicit permission from the system owner.

## Style Guidelines:

- Primary color: SharePoint blue (#03A9F4) to mimic the original site's branding.
- Background color: Light gray (#FAFAFA) for a clean and corporate feel, providing contrast to the blue elements.
- Accent color: A slightly darker shade of blue (#0288D1) for interactive elements to indicate activity.
- Font: 'Inter', sans-serif, for body text and headlines, providing a modern and neutral look.
- Replicates the SharePoint login page layout exactly, including input field positions and button styling.
- Uses original SharePoint icons to maintain a consistent look and feel.
- Subtle loading animations to simulate a real login process.