import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Blurred Image with Excel Login Overlay',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <FirebaseClientProvider>
          <main className="h-full">{children}</main>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
