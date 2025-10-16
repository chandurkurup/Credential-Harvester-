"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound } from 'lucide-react';

const ExcelLogo = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.6667 12.8333V4.66667L18.6667 0H7C6.07953 0 5.25 0.829531 5.25 1.75V26.25C5.25 27.1705 6.07953 28 7 28H21C21.9205 28 22.75 27.1705 22.75 26.25V12.8333H25.6667Z" fill="#107C41"/>
      <path d="M18.6667 0L25.6667 4.66667V12.8333H22.75V1.75C22.75 0.829531 21.9205 0 21 0H18.6667Z" fill="#107C41"/>
      <path d="M18.6667 0V8.16667H25.6667" fill="#18884F"/>
      <path d="M16.1042 14.5833L12.4467 20.9167H16.03L18.1583 17.2083L20.2867 20.9167H23.87L20.2125 14.5833L18.1583 17.8917L16.1042 14.5833Z" fill="white"/>
    </svg>
);

const MicrosoftLogo = () => (
  <div className="flex space-x-0.5">
    <div className="w-4 h-4 bg-[#F25022]"></div>
    <div className="w-4 h-4 bg-[#7FBA00]"></div>
    <div className="w-4 h-4 bg-[#00A4EF]"></div>
    <div className="w-4 h-4 bg-[#FFB900]"></div>
  </div>
);


export function PhishingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    console.warn('--- FOR AUTHORIZED TESTING ONLY ---');
    console.log('Phishing attempt with credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.warn('---------------------------------');
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = 'https://www.google.com/search?q=excel';
    }, 1500);
  };

  if (submitted) {
    return (
        <Card className="w-full max-w-md shadow-2xl bg-[#107C41]/95 text-white rounded-none">
            <CardContent className="p-12 text-center">
                <p>Verifying credentials, please wait...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-sm shadow-2xl bg-[#107C41] text-white rounded-none">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                  <MicrosoftLogo />
                  <span className="text-lg font-semibold">Microsoft</span>
              </div>
              <ExcelLogo />
          </div>
          <h2 className="text-xl font-semibold mb-1">Sign in to view Excel Spreadsheet</h2>
          <p className="text-xs text-gray-200 mb-4">Only Email recipient can view</p>
          
          <div className="space-y-3">
            <Input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black placeholder-gray-500 rounded-sm"
            />
            <Input 
              type="password" 
              placeholder="Email Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-black placeholder-gray-500 rounded-sm"
            />
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleClick} 
              className="bg-white text-black hover:bg-gray-200 rounded-sm px-8"
            >
              View
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="bg-white shadow-lg p-2 mt-2 w-full max-w-sm flex items-center justify-center">
        <Button variant="link" className="text-sm text-gray-700 hover:text-gray-900">
          <KeyRound className="w-4 h-4 mr-2" />
          Sign-in using other options
        </Button>
      </div>
    </div>
  );
}