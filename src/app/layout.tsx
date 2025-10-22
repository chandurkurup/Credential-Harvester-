import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Blurred Image with Excel Login Overlay',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FirebaseClientProvider>{children}</FirebaseClientProvider>
        {/* SweetAlert2 library */}
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </body>
    </html>
  );
}
