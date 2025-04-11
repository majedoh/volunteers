// src/contexts/LanguageContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

type Language = 'ar' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, any>;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translationsData: Record<Language, Record<string, any>> = {
  ar: arTranslations,
  en: enTranslations,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load language from localStorage on initial client render
    const storedLanguage = localStorage.getItem('haramain-volunteers-lang') as Language | null;
    if (storedLanguage && (storedLanguage === 'ar' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage);
    } else {
        setLanguageState('ar'); // Ensure default is Arabic if storage is invalid/empty
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('haramain-volunteers-lang', newLanguage);
      // Update document direction
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  };

    // Effect to set initial document attributes once loaded
    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [language, isLoaded]);


  // Memoized translation function
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = translationsData[language];

    try {
      for (const k of keys) {
        if (result === undefined) {
          throw new Error(`Translation key "${key}" not found.`);
        }
        result = result[k];
      }

      if (typeof result !== 'string') {
          console.warn(`Translation key "${key}" did not resolve to a string in language "${language}".`);
          return key; // Return key if not a string
      }

      // Replace placeholders like {name} or {year}
      if (params) {
        Object.keys(params).forEach((paramKey) => {
          const regex = new RegExp(`{${paramKey}}`, 'g');
          result = result.replace(regex, String(params[paramKey]));
        });
      }

      return result;
    } catch (error) {
        console.error(error);
        // Fallback to English if translation is missing in the current language
        if (language !== 'en') {
            try {
                let fallbackResult = translationsData['en'];
                for (const k of keys) {
                    if (fallbackResult === undefined) break;
                    fallbackResult = fallbackResult[k];
                }
                if (typeof fallbackResult === 'string') {
                     if (params) {
                        Object.keys(params).forEach((paramKey) => {
                        const regex = new RegExp(`{${paramKey}}`, 'g');
                        fallbackResult = fallbackResult.replace(regex, String(params[paramKey]));
                        });
                    }
                    return fallbackResult;
                }
            } catch {
                // Ignore fallback error
            }
        }
      return key; // Return the key itself as a last resort
    }
  }, [language]);


  const value = {
    language,
    setLanguage,
    translations: translationsData[language],
    t,
  };

  // Prevent rendering children until language is loaded from localStorage
  if (!isLoaded) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};