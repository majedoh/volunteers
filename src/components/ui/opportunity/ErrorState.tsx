// src/components/ui/opportunity/ErrorState.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  className = '',
}) => {
  const { t } = useLanguage();
  
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{t('errorLoadingOpportunities')}</h3>
      <p className="text-gray-500 max-w-md mb-6">
        {error?.message || t('somethingWentWrong')}
      </p>
      <Button onClick={onRetry} variant="default">
        {t('tryAgain')}
      </Button>
    </div>
  );
};

export default ErrorState;