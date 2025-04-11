// src/app/unauthorized/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import Link from 'next/link';
import { ShieldAlert, Home, LogIn } from 'lucide-react';

const UnauthorizedPage = () => {
  const { t } = useLanguage();
  const { status, isAdmin } = useAuth();

  // Update document title
  useEffect(() => {
    document.title = `${t('unauthorized')} | ${t('siteName')}`;
    
    return () => {
      document.title = t('siteName');
    };
  }, [t]);

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-32 pb-16 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 mb-6 flex justify-center">
            <ShieldAlert className="h-16 w-16" />
          </div>
          
          <h1 className="text-2xl font-bold text-primary mb-4">
            {t('unauthorized')}
          </h1>
          
          <p className="text-neutral-600 mb-6">
            {status === 'unauthenticated' 
              ? t('pleaseSignInAdmin')
              : t('notAdminAccount')}
          </p>
          
          <div className="space-y-4">
            {status === 'unauthenticated' ? (
              <GoogleSignInButton className="w-full" />
            ) : !isAdmin ? (
              <div className="space-y-2">
                <p className="text-sm text-neutral-500">{t('contactAdminSupport')}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    {t('backToHome')}
                  </Link>
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/dashboard">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('goToDashboard')}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;