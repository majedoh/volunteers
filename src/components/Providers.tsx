'use client';

// src/components/Providers.tsx
import React from 'react';
import { LanguageProvider } from '@/context/language-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}