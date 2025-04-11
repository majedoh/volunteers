// src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    // Adjusted padding, using bg-gradient for subtle visual interest
    <section className="w-full py-24 md:py-32 lg:py-48 bg-gradient-to-b from-background via-secondary to-background">
       {/* Use container for content alignment */}
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
           {/* Headline styling */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary drop-shadow-sm"> {/* Added slight drop shadow */}
            {t('homepage.hero.title')}
          </h1>
           {/* Subtitle styling */}
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl"> {/* Increased text size */}
            {t('homepage.hero.subtitle')}
          </p>
          <div className="pt-6"> {/* Increased spacing */}
             {/* CTA Button Styling */}
            <Button size="lg" variant="default" className="font-semibold text-lg px-8 py-3 shadow-lg hover:shadow-primary/40 transition-shadow duration-300" asChild>
                <a href="#opportunities"> {/* Link to opportunities section */}
                    {t('homepage.hero.cta')}
                    <ArrowDown className="ms-2 rtl:me-2 h-5 w-5 animate-bounce" /> {/* Added icon */}
                 </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}