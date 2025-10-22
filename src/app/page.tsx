'use client';
import { FormEvent, useState } from 'react';
import { captureCredentials } from '@/ai/flows/capture-credentials';
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
import { ShieldAlert } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await captureCredentials({ username, password });
    setShowAlert(true);
    // Reset form
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="text-yellow-500 h-8 w-8" />
              This was a Phishing Simulation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-4">
              This was a test to help you recognize phishing attempts. Your credentials were recorded for this simulation but have not been compromised.
              <br/><br/>
              Always check the URL and sender before entering your credentials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
