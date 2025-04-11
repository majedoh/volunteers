// src/components/sections/CallToAction.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-t from-secondary via-background to-background">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <p className="mx-auto max-w-[600px] text-foreground/80 text-lg md:text-xl">
            {t('homepage.cta.text')}
          </p>
          <div className="pt-4">
            {/* Link this button to the login/registration page/modal */}
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t('homepage.cta.button')}
            </Button>
            {/* Add Google Sign-In Button here later */}
            {/* <Button variant="outline" size="lg" className="mt-4">
                <Chrome className="mr-2 h-4 w-4" /> {t('auth.signInWithGoogle')}
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}