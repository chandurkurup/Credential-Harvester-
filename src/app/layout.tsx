import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Blurred Image with Excel Login Overlay',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" />
      </head>
      <body suppressHydrationWarning>
        <FirebaseClientProvider>{children}</FirebaseClientProvider>
        <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></Script>
      </body>
    </html>
  );
}
