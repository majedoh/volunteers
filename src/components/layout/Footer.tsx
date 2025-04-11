// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    // Use bg-muted for a subtle distinction from main background
    <footer className="bg-muted text-muted-foreground">
      <Separator />
       {/* Adjusted padding and text size */}
      <div className="container py-6 text-sm flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-4">
        <p className="text-xs md:text-sm"> {/* Slightly smaller text */}
          {t('footer.copyright', { year: currentYear })}
        </p>
        <nav className="flex gap-4 text-xs md:text-sm">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            {t('footer.links.privacy')}
          </Link>
          <Separator orientation="vertical" className="h-4 self-center bg-border" /> {/* Added separator */}
          <Link href="/terms" className="hover:text-primary transition-colors">
            {t('footer.links.terms')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}