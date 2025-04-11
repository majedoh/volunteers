// src/app/admin/layout.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import AdminSidebarNav from '@/components/admin/AdminSidebarNav';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SignOutButton } from '@/components/auth';
import { Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t, dir } = useLanguage();
  const { status, isAdmin, user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Update document title
  useEffect(() => {
    document.title = `${t('adminPortal')} | ${t('siteName')}`;
    
    return () => {
      document.title = t('siteName');
    };
  }, [t]);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/unauthorized');
    } else if (!isAdmin) {
      router.push('/unauthorized');
    }
  }, [status, isAdmin, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not admin, don't render anything (redirect will happen via useEffect)
  if (status === 'unauthenticated' || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed w-full z-10">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Logo & Mobile Menu Toggle */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            
            <Link href="/admin/dashboard" className="flex items-center">
              <img
                src="/images/logo.png"
                alt={t('siteName')}
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg ml-2 mr-2 text-primary">
                {t('adminPortal')}
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative" 
              aria-label={t('notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <LanguageSwitcher variant="outline" size="sm" />
            
            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={user?.image || ''} alt={user?.name || t('adminUser')} />
                <AvatarFallback className="bg-primary text-white">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              
              <SignOutButton variant="ghost" size="sm" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="w-64 bg-white h-screen overflow-y-auto py-6 px-2" 
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebarNav />
            
            <div className="mt-auto pt-6 border-t border-gray-200 px-3">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || ''} alt={user?.name || t('adminUser')} />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
              
              <SignOutButton className="w-full" />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="md:pl-64 pt-16">
        <AdminSidebarNav />
        
        <main className="p-6">
          {children}
        </main>
      </div>
      
      {/* Development-only auth toggle */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-4 right-4 z-50">
          {/* DevAuthToggle will be rendered here */}
        </div>
      )}
    </div>
  );
};

export default AdminLayout;