// src/components/sections/HeroSection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();
  
  const scrollToOpportunities = () => {
    const opportunitiesSection = document.getElementById('opportunities');
    if (opportunitiesSection) {
      opportunitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-black/50 z-10"
          aria-hidden="true"
        ></div>
        <img
          src="/images/i1234.png"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center py-20">
        <h1 
          className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.3)' 
          }}
        >
          {t('heroTitle')}
        </h1>
        
        <p 
          className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto mb-10"
          style={{ 
            textShadow: '0 1px 2px rgba(0,0,0,0.3)' 
          }}
        >
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="bg-accent hover:bg-accent-dark text-white px-8 py-6 text-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={scrollToOpportunities}
          >
            {t('heroButtonText')}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
          >
            {t('signUp')}
          </Button>
        </div>
        
        {/* Scroll down indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer"
          onClick={scrollToOpportunities}
        >
          <ChevronDown className="h-10 w-10 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default HeroSection;