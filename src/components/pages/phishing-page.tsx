"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExcelLogo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#107C41"/>
    <path d="M29.96 14L22.4 27.2L29.52 40H22.12L17.8 32.16L13.48 40H6.08L13.2 27.2L6 14H13.4L17.72 21.84L22.04 14H29.96Z" fill="white"/>
  </svg>
);

const OutlookLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 5.5H3.5C2.39543 5.5 1.5 6.39543 1.5 7.5V16.5C1.5 17.6046 2.39543 18.5 3.5 18.5H14.5C15.6046 18.5 16.5 17.6046 16.5 16.5V7.5C16.5 6.39543 15.6046 5.5 14.5 5.5Z" fill="#0072C6"/>
    <path d="M14.5 6.5L9 11L3.5 6.5" stroke="white" strokeWidth="1.2"/>
    <rect x="15" y="10" width="8" height="8" rx="1" fill="#0072C6"/>
    <circle cx="19" cy="14" r="2.5" fill="white"/>
    <path d="M19 12V14" stroke="#0072C6" strokeWidth="1.2"/>
  </svg>
);

const OfficeLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.375 5.25L5.625 7.5V16.5L12.375 18.75V22.5L3.375 19.5V4.5L12.375 1.5L21.375 4.5V12.75H18.375V7.5L12.375 5.25Z" fill="white"/>
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
    <Card className="w-full max-w-md shadow-2xl bg-[#333333]/90 backdrop-blur-sm border-2 border-white/10 text-white rounded-xl">
      <CardHeader className="flex flex-col items-center text-center p-6">
        <div className="flex items-center gap-3">
          <ExcelLogo />
          <CardTitle className="text-2xl font-semibold">Microsoft Excel</CardTitle>
        </div>
        <CardDescription className="text-gray-300 pt-2 text-base">
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
          <Button onClick={handleClick} className="w-full h-12 text-base font-semibold bg-[#0078D4] hover:bg-[#005a9e] flex items-center justify-start px-4">
            <OtherMailLogo />
            <span className="flex-grow text-center">Sign in with Other Mail</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2 flex justify-center">
        <p className="text-xs text-gray-400">&copy;2021 Microsoft.</p>
      </CardFooter>
    </Card>
  );
}
