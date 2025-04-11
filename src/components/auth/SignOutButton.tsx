// src/components/auth/SignOutButton.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { LogOut, Loader2 } from 'lucide-react';

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  variant = 'outline',
  size = 'default',
  className = '',
}) => {
  const { t } = useLanguage();
  const { signOutUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      disabled={isLoading}
      className={`flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      <span>{t('signOut')}</span>
    </Button>
  );
};

export default SignOutButton;