// src/context/language-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';
type TranslationsType = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
  translations: TranslationsType;
  isLoading: boolean;
}

// Create context with default values
const defaultContextValue: LanguageContextType = {
  language: 'ar',
  setLanguage: () => {},
  t: (key) => key,
  dir: 'rtl',
  translations: {},
  isLoading: true
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [translations, setTranslations] = useState<TranslationsType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load translations based on language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/locales/${language}/common.json`);
        const data = await response.json();
        setTranslations(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading translations:', error);
        setIsLoading(false);
      }
    };
    
    loadTranslations();
  }, [language]);

  // Initialize with stored preference
  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem('language') as Language | null;
      if (storedLanguage && (storedLanguage === 'ar' || storedLanguage === 'en')) {
        setLanguageState(storedLanguage);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
    
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document !== 'undefined' && mounted) {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir, mounted]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      dir, 
      translations,
      isLoading 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};