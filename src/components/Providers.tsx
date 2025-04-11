'use client';

// src/components/Providers.tsx (SIMULATED FOR DEVELOPMENT)
import React from 'react';
import { LanguageProvider } from '@/context/language-context';
import { AuthProvider } from '@/context/auth-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
}