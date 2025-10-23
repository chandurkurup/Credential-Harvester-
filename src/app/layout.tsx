import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Credential Harvester',
  description: 'Sign in to continue.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="login-page-background flex min-h-screen flex-col items-center justify-center">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
