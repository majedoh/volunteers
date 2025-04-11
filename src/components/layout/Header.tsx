// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import SignOutButton from '@/components/auth/SignOutButton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const { user, status, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    };
  }, [isUserMenuOpen]);
  
  // Navigation links
  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/#about' },
    { name: t('opportunities'), path: '/opportunities' },
    { name: t('contact'), path: '/#contact' },
  ];
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt={t('siteName')}
            className="h-10 w-auto"
          />
          <span
            className={`font-bold text-xl ${
              isScrolled ? 'text-primary' : 'text-white'
            } ml-2`}
            style={{ marginLeft: dir === 'rtl' ? '0' : '0.5rem', marginRight: dir === 'rtl' ? '0.5rem' : '0' }}
          >
            {t('siteName')}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-neutral-800 hover:text-primary' : 'text-white hover:text-white/80'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`font-medium transition-colors flex items-center ${
                    isScrolled ? 'text-neutral-800 hover:text-primary' : 'text-white hover:text-white/80'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2 ml-2" />
                  {t('adminDashboard')}
                </Link>
              </li>
            )}
          </ul>
          
          <div className="flex items-center gap-3">
            <LanguageSwitcher 
              variant={isScrolled ? 'outline' : 'secondary'} 
              size="sm" 
              className={isScrolled ? '' : 'border-white text-white hover:bg-white/20'}
            />
            
            {status === 'authenticated' ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                    <AvatarFallback className={isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}>
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      {isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          {t('adminDashboard')}
                        </Link>
                      )}
                      <div className="p-2">
                        <SignOutButton variant="ghost" className="w-full justify-start" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <GoogleSignInButton
                variant={isScrolled ? 'default' : 'outline'}
                className={!isScrolled ? 'border-white text-white hover:bg-white/20' : ''}
              />
            )}
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher 
            variant={isScrolled ? 'outline' : 'secondary'} 
            size="sm" 
            className={isScrolled ? '' : 'border-white text-white hover:bg-white/20'}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={isScrolled ? 'text-neutral-800' : 'text-white'}
          >
            {isMobileMenuOpen ? 
              <X className="h-6 w-6" /> : 
              <Menu className="h-6 w-6" />
            }
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="block font-medium text-neutral-800 hover:text-primary py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="block font-medium text-neutral-800 hover:text-primary py-2 flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2 ml-2" />
                      {t('adminDashboard')}
                    </Link>
                  </li>
                )}
                <li>
                  {status === 'authenticated' ? (
                    <div className="border-t pt-4 mt-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                          <AvatarFallback className="bg-primary text-white">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <SignOutButton variant="outline" className="w-full" />
                    </div>
                  ) : (
                    <GoogleSignInButton
                      className="w-full mt-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;