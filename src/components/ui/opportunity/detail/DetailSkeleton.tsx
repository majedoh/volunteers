// src/components/ui/opportunity/detail/DetailSkeleton.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import styles from '@/styles/opportunity/detail.module.css';

const DetailSkeleton: React.FC = () => {
  const { t, dir } = useLanguage();
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.backButtonContainer}>
        <Link href="/opportunities">
          <Button variant="outline" size="sm" className={styles.backButton}>
            <BackIcon className="h-4 w-4 mr-2" />
            {t('backToOpportunities')}
          </Button>
        </Link>
      </div>
      
      {/* Image skeleton */}
      <div className={`${styles.heroImage} ${styles.skeletonImage}`}></div>
      
      {/* Title skeleton */}
      <div className={styles.titleContainer}>
        <div className={styles.meta}>
          <div className={`${styles.skeletonBadge} ${styles.skeletonPulse}`}></div>
        </div>
        
        <div className={`${styles.skeletonTitle} ${styles.skeletonPulse}`}></div>
        
        <div className={styles.details}>
          <div className={`${styles.skeletonDetail} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonDetail} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonDetail} ${styles.skeletonPulse}`}></div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={`${styles.skeletonSectionTitle} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonParagraph} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonParagraph} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonParagraph} ${styles.skeletonPulse}`}></div>
        </section>
        
        <div className={styles.twoColumnGrid}>
          <section className={styles.section}>
            <div className={`${styles.skeletonSectionTitle} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.skeletonList} ${styles.skeletonPulse}`}></div>
          </section>
          
          <section className={styles.section}>
            <div className={`${styles.skeletonSectionTitle} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.skeletonList} ${styles.skeletonPulse}`}></div>
          </section>
        </div>
        
        {/* Action buttons skeleton */}
        <div className={`${styles.actions} ${styles.skeletonActions}`}>
          <div className={`${styles.skeletonText} ${styles.skeletonPulse}`}></div>
          <div className={styles.actionButtons}>
            <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.skeletonButton} ${styles.skeletonPulse}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;