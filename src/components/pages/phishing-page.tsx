"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExcelLogo = () => (
    <div className="flex items-center justify-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L6 2 6 22 18 22 18 8 14 2z" fill="#107C41"/>
            <path d="M13 3.5L13 9 17 9" fill="#107C41" stroke="#fff" strokeWidth="1"/>
            <path d="M12.28 12.5l-3.36 5.82 3.2 5.53h-3.32l-1.92-3.33-1.92 3.33H5.5l3.2-5.53L5.32 12.5h3.32l1.92 3.33 1.92-3.33h3.4z" fill="#fff"/>
        </svg>
        <span className="text-sm font-semibold text-white">Excel</span>
    </div>
);

const OutlookLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5.5H3.5C2.39543 5.5 1.5 6.39543 1.5 7.5V16.5C1.5 17.6046 2.39543 18.5 3.5 18.5H14.5C15.6046 18.5 16.5 17.6046 16.5 16.5V7.5C16.5 6.39543 15.6046 5.5 14.5 5.5Z" fill="white"/>
      <path d="M14.5 6.5L9 11L3.5 6.5" stroke="#0072C6" strokeWidth="1.2"/>
      <rect x="15" y="10" width="8" height="8" rx="1" fill="white"/>
      <circle cx="19" cy="14" r="2.5" fill="#0072C6"/>
      <path d="M19 12V14" stroke="white" strokeWidth="1.2"/>
    </svg>
  );

const OfficeLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.375 5.25L5.625 7.5V16.5L12.375 18.75V22.5L3.375 19.5V4.5L12.375 1.5L21.375 4.5V12.75H18.375V7.5L12.375 5.25Z" fill="#D83B01"/>
        <rect x="15" y="10" width="8" height="8" rx="1" fill="#D83B01"/>
        <path d="M20.625 15.75H15.375V21H20.625V15.75Z" fill="white"/>
    </svg>
);


const OtherMailLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20C9.67 20 7.69 18.73 6.43 16.89C6.5 14.93 10.33 13.8 12 13.8C13.67 13.8 17.5 14.93 17.57 16.89C16.31 18.73 14.33 20 12 20Z" fill="white"/>
    </svg>
);

export function PhishingPage() {
  const [redirecting, setRedirecting] = useState(false);

  const handleClick = () => {
    setRedirecting(true);
    console.warn('--- FOR AUTHORIZED TESTING ONLY ---');
    console.log('Login button clicked. Captured credentials would appear here.');
    console.warn('---------------------------------');
    
    // In a real scenario, you would redirect to an actual phishing page.
    // For this demo, we'll simulate a redirect after a delay.
    setTimeout(() => {
        window.location.href = 'https://www.google.com/search?q=excel';
    }, 2000);
  };

  if (redirecting) {
    return (
        <Card className="w-full max-w-md shadow-2xl bg-[#333333]/90 backdrop-blur-sm border-2 border-white/10 text-white rounded-xl">
            <CardContent className="p-8 text-center">
                <p>Redirecting to login page...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-[#3c3c3c] text-white rounded-lg border border-gray-500/50">
      <CardHeader className="flex flex-col items-center text-center p-6 space-y-4">
        <div className="flex items-center gap-2 bg-[#107C41] py-1 px-3 rounded-md">
            <ExcelLogo />
        </div>
        <CardTitle className="text-xl font-normal">Microsoft Excel</CardTitle>
        <CardDescription className="text-gray-300 text-sm">
          Please enter the email credentials this file was shared with.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <div className="flex flex-col space-y-3">
          <Button onClick={handleClick} className="w-full h-12 text-base font-semibold bg-[#0078D4] hover:bg-[#005a9e] flex items-center justify-start px-4">
            <OutlookLogo />
            <span className="flex-grow text-center">Sign in with Outlook</span>
          </Button>
          <Button onClick={handleClick} className="w-full h-12 text-base font-semibold bg-[#D83B01] hover:bg-[#a42d00] flex items-center justify-start px-4">
            <OfficeLogo />
            <span className="flex-grow text-center">Sign in with Office365</span>
          </Button>
          <Button onClick={handleClick} className="w-full h-12 text-base font-semibold bg-[#5e5e5e] hover:bg-[#4a4a4a] flex items-center justify-start px-4">
            <OtherMailLogo />
            <span className="flex-grow text-center">Sign in with Other Mail</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-4 flex justify-center">
        <p className="text-xs text-gray-400">&copy;2021 Microsoft.</p>
      </CardFooter>
    </Card>
  );
}
