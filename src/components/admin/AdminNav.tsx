// src/components/admin/AdminNav.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import SignOutButton from '@/components/auth/SignOutButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';

const AdminNav: React.FC = () => {
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links for admin
  const navItems = [
    { 
      name: t('dashboard'), 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: t('volunteers'), 
      path: '/admin/volunteers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: t('opportunities'), 
      path: '/admin/opportunities', 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      name: t('settings'), 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt={t('siteName')} 
                className="h-8 w-auto"
              />
              <span className="ml-2 mr-2 font-bold text-lg">{t('adminPortal')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? 'bg-primary-dark text-white'
                      : 'text-white hover:bg-primary-dark/50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2 mr-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            {/* User Avatar & Name (Desktop) */}
            <div className="hidden md:flex items-center mr-4 ml-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 mr-2 text-sm font-medium">{user?.name}</span>
            </div>

            {/* Sign Out Button (Desktop) */}
            <div className="hidden md:block">
              <SignOutButton variant="ghost" size="sm" />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-white hover:bg-primary/70'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2 mr-2">{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-primary">
              <div className="flex items-center px-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 mr-3">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-300">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <SignOutButton className="w-full" variant="outline" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNav;