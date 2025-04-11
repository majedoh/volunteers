// src/components/ui/opportunity/EmptyState.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onReset: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  className = '',
}) => {
  const { t } = useLanguage();
  
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <SearchX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{t('noOpportunitiesFound')}</h3>
      <p className="text-gray-500 max-w-md mb-6">{t('noOpportunitiesMessage')}</p>
      <Button onClick={onReset} variant="outline">
        {t('clearFilters')}
      </Button>
    </div>
  );
};

export default EmptyState;