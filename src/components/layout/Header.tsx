// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/context/language-context';
import { Menu, X, User } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
  
  // Navigation links
  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/#about' },
    { name: t('opportunities'), path: '/#opportunities' },
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
          </ul>
          
          <div className="flex items-center gap-3">
            <LanguageSwitcher 
              variant={isScrolled ? 'outline' : 'secondary'} 
              size="sm" 
              className={isScrolled ? '' : 'border-white text-white hover:bg-white/20'}
            />
            
            <Button
              variant={isScrolled ? 'default' : 'outline'}
              className={!isScrolled ? 'border-white text-white hover:bg-white/20' : ''}
            >
              <User className="h-4 w-4 mr-2" />
              {t('login')}
            </Button>
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
                <li>
                  <Button
                    variant="default"
                    className="w-full mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('login')}
                  </Button>
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