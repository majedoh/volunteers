// src/components/ui/LanguageSwitcher.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'outline',
  size = 'default',
  className = '',
}) => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={`flex items-center gap-2 ${className}`}
      aria-label={t('switchLanguage')}
    >
      <Globe className="h-4 w-4" />
      <span>{t('languageName')}</span>
    </Button>
  );
};

export default LanguageSwitcher;