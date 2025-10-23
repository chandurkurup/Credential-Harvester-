'use client';

import LoginPageClient from '@/components/login-page-client';
import React from 'react';

export default function SharePointDynamicPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoginPageClient />
    </React.Suspense>
  );
}
