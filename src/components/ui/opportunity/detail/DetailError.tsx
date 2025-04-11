// src/components/ui/opportunity/detail/DetailError.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import styles from '@/styles/opportunity/detail.module.css';

interface DetailErrorProps {
  error: Error | null;
  onRetry: () => void;
}

const DetailError: React.FC<DetailErrorProps> = ({
  error,
  onRetry,
}) => {
  const { t, dir } = useLanguage();
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  
  return (
    <div className={styles.errorContainer}>
      <div className={styles.backButtonContainer}>
        <Link href="/opportunities">
          <Button variant="outline" size="sm" className={styles.backButton}>
            <BackIcon className="h-4 w-4 mr-2" />
            {t('backToOpportunities')}
          </Button>
        </Link>
      </div>
      
      <div className={styles.errorContent}>
        <AlertTriangle className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>{t('errorLoadingOpportunity')}</h2>
        <p className={styles.errorMessage}>
          {error?.message || t('somethingWentWrong')}
        </p>
        <div className={styles.errorActions}>
          <Button onClick={onRetry} variant="default">
            {t('tryAgain')}
          </Button>
          <Link href="/opportunities">
            <Button variant="outline">
              {t('browseOtherOpportunities')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailError;