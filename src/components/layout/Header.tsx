// src/components/layout/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2 } from 'lucide-react'; // Example Icon

export function Header() {
  const { t } = useLanguage();

  return (
    // Added shadow for slight elevation, adjusted padding
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center px-4 md:px-6"> {/* Increased height slightly */}
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center gap-2 rtl:ml-6 rtl:mr-0">
          <Building2 className="h-6 w-6 text-primary" /> {/* Example Logo Icon */}
          <span className="font-bold text-lg text-primary hidden sm:inline-block"> {/* Increased size slightly */}
            {t('common.appName')}
          </span>
        </Link>

        {/* Navigation Links - Added hover effect */}
        <nav className="flex flex-1 items-center gap-5 text-sm font-medium lg:gap-6"> {/* Increased gap */}
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-primary" // Use primary color on hover
          >
            {t('header.nav.home')}
          </Link>
          <Link
            href="/#opportunities"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {t('header.nav.opportunities')}
          </Link>
          <Link
            href="/#about"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {t('header.nav.about')}
          </Link>
          {/* Add more links as needed */}
        </nav>

        {/* Right side actions - Increased gap */}
        <div className="flex items-center gap-3 md:gap-4"> {/* Adjusted gap */}
          <LanguageSwitcher />
          {/* Make Login Button more prominent */}
          <Button variant="default" size="sm" className="font-semibold">
            {t('header.loginButton')}
          </Button>
        </div>
      </div>
    </header>
  );
}