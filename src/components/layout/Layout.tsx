// src/components/layout/Layout.tsx
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/language-context';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dir } = useLanguage();
  
  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      
      <Header />
      
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;