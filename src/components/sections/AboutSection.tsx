// src/components/sections/AboutSection.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('homepage.about.title')}
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              {t('homepage.about.content')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            {/* Optional: Placeholder for an image or illustration */}
            {/* <img
              alt="About Us Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="310"
              src="/placeholder.svg" // Replace with actual relevant image
              width="550"
            /> */}
             <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                Image/Illustration Placeholder
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}