// src/components/sections/FeaturedOpportunities.tsx
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, ArrowRight } from 'lucide-react'; // Added ArrowRight

export function FeaturedOpportunities() {
  const { t } = useLanguage();

  // Placeholder data
  const opportunities = [
    { id: 1, location: 'المسجد الحرام', duration: 'موسم الحج', locationEn: 'Grand Mosque', durationEn: 'Hajj Season' },
    { id: 2, location: 'المسجد النبوي', duration: 'شهر رمضان', locationEn: 'Prophet\'s Mosque', durationEn: 'Ramadan Month' },
    { id: 3, location: 'المسجد الحرام', duration: 'عطلة نهاية الأسبوع', locationEn: 'Grand Mosque', durationEn: 'Weekends' },
  ];

  const { language } = useLanguage(); // Get language to display correct text

  return (
    <section id="opportunities" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          {/* Section Title */}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            {t('homepage.featured.title')}
          </h2>
           {/* Optional Section Subtitle */}
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            {/* Add a subtitle here if desired */}
            اكتشف كيف يمكنك المساهمة بوقتك ومهاراتك في خدمة ضيوف الرحمن.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            // Card Styling: Added hover effect, border
            <Card key={opp.id} className="flex flex-col bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 ease-in-out group">
              <CardHeader className="pb-4"> {/* Reduced bottom padding */}
                {/* Card Title */}
                <CardTitle className="text-xl font-semibold text-primary">
                  {t('homepage.featured.card.titlePlaceholder')} {opp.id}
                </CardTitle>
                 {/* Card Description */}
                <CardDescription className="text-foreground/80 pt-1 line-clamp-3"> {/* Allow multiple lines */}
                    {t('homepage.featured.card.descriptionPlaceholder')}
                </CardDescription>
              </CardHeader>
              {/* Card Content - Use flex-grow to push footer down */}
              <CardContent className="flex-grow space-y-3 pt-2">
                 {/* Location Info */}
                 <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 me-2 rtl:ms-2 text-primary/80"/>
                    <span className="font-medium text-foreground/90 me-1 rtl:ms-1">{t('homepage.featured.card.location')}</span>
                    {language === 'ar' ? opp.location : opp.locationEn}
                 </div>
                  {/* Duration Info */}
                 <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 me-2 rtl:ms-2 text-primary/80"/>
                    <span className="font-medium text-foreground/90 me-1 rtl:ms-1">{t('homepage.featured.card.duration')}</span>
                     {language === 'ar' ? opp.duration : opp.durationEn}
                 </div>
              </CardContent>
              <CardFooter className="pt-4">
                {/* Details Button Styling */}
                <Button variant="outline" className="w-full font-medium border-primary/50 text-primary hover:bg-primary/5 hover:text-primary group-hover:border-primary transition-colors duration-200">
                  {t('homepage.featured.card.viewDetails')}
                  <ArrowRight className="ms-2 rtl:me-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" /> {/* Added icon and hover animation */}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}