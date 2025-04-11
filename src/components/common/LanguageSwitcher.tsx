// src/components/common/LanguageSwitcher.tsx
'use client';

import * as React from "react";
import { Languages } from "lucide-react"; // Using lucide-react included with shadcn

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('common.language')}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('common.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('ar')}
          disabled={language === 'ar'}
          className={language === 'ar' ? 'font-semibold bg-muted' : ''}
        >
          {t('common.arabic')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          disabled={language === 'en'}
           className={language === 'en' ? 'font-semibold bg-muted' : ''}
       >
          {t('common.english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}