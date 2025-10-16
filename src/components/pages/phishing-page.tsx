"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, KeyRound, Building } from 'lucide-react';

const ExcelLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2L6 2 6 22 18 22 18 8 14 2z" fill="#107C41"/>
        <path d="M13 3.5L13 9 17 9" fill="#107C41" stroke="#fff" strokeWidth="1.5"/>
        <path d="M12.28 12.5l-3.36 5.82h3.32l1.92-3.33 1.92 3.33h3.4l-3.36-5.82-1.92 3.33z" fill="#fff" />
        <path d="M9.1 12.5L5.74 18.32H9.06L10.98 15.01L9.1 12.5Z" fill="#fff"/>
    </svg>
);

const OutlookLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.4 3.6H3.6C3.26863 3.6 3 3.86863 3 4.2V19.8C3 20.1314 3.26863 20.4 3.6 20.4H20.4C20.7314 20.4 21 20.1314 21 19.8V4.2C21 3.86863 20.7314 3.6 20.4 3.6Z" fill="#0072C6"/>
        <path d="M12.42,12.25l7.83-5.87c-0.12-0.12-0.3-0.18-0.45-0.18H4.2c-0.15,0-0.33,0.06-0.45,0.18l7.83,5.87 C11.85,12.49,12.15,12.49,12.42,12.25z" fill="#FFFFFF"/>
        <path d="M3.75,7.18l6.3,4.72c0.54,0.4,1.26,0.4,1.8,0l6.3-4.72V17.8c-0.12,0.12-0.3,0.18-0.45,0.18H4.2 c-0.15,0-0.33-0.06-0.45-0.18V7.18z" fill="#FFFFFF"/>
    </svg>
);

const OfficeLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4,4H20V20H4V4Z" fill="#D83B01"/>
        <path d="M6,7h12v10H6V7z" fill="white"/>
        <path d="M8 9.5L13.5 13L8 16.5V9.5z" fill="#C33501"/>
    </svg>
);


export function PhishingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (provider: string) => {
    console.warn('--- FOR AUTHORIZED TESTING ONLY ---');
    console.log('Phishing attempt via:', provider);
    console.warn('---------------------------------');
    setSubmitted(true);
    setTimeout(() => {
        window.location.href = 'https://www.google.com/search?q=excel';
    }, 1500);
  };

  if (submitted) {
    return (
        <Card className="w-full max-w-md shadow-2xl bg-gray-800/95 border-gray-600/50 text-white rounded-lg">
            <CardContent className="p-12 text-center">
                <p>Verifying credentials, please wait...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-gray-800/95 text-white rounded-lg border-gray-600/50">
      <CardHeader className="flex flex-col items-center text-center p-6 pt-8 space-y-4">
        <div className="flex items-center gap-3">
            <ExcelLogo />
            <h1 className="text-xl font-semibold">Microsoft Excel</h1>
        </div>
        <CardDescription className="text-gray-300 text-sm">
            Please enter the email credentials this file was shared with.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="flex flex-col space-y-3">
            <Button 
                onClick={() => handleClick('Outlook')} 
                className="h-12 text-base justify-start pl-4 gap-3 bg-[#0078D4] hover:bg-[#005a9e] rounded-md"
            >
                <OutlookLogo />
                Sign in with Outlook
            </Button>
            <Button 
                onClick={() => handleClick('Office365')} 
                className="h-12 text-base justify-start pl-4 gap-3 bg-[#D85022] hover:bg-[#b0401a] rounded-md"
            >
                <OfficeLogo />
                Sign in with Office365
            </Button>
            <Button 
                onClick={() => handleClick('Other Mail')} 
                className="h-12 text-base justify-start pl-4 gap-3 bg-[#2d5aa8] hover:bg-[#224480] rounded-md"
            >
                <Mail className="w-5 h-5"/>
                Sign in with Other Mail
            </Button>
        </div>
        <div className="text-center mt-8">
            <p className="text-xs text-gray-400">&copy;2021 Microsoft.</p>
        </div>
      </CardContent>
    </Card>
  );
}
