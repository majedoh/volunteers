// src/app/opportunities/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import Layout from '@/components/layout/Layout';
import DetailHeader from '@/components/ui/opportunity/detail/DetailHeader';
import DetailContent from '@/components/ui/opportunity/detail/DetailContent';
import DetailActions from '@/components/ui/opportunity/detail/DetailActions';
import DetailSkeleton from '@/components/ui/opportunity/detail/DetailSkeleton';
import DetailError from '@/components/ui/opportunity/detail/DetailError';
import { useOpportunityDetail } from '@/hooks/api/useOpportunityDetail';
import styles from '@/styles/opportunity/detail.module.css';

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const { opportunity, loading, error } = useOpportunityDetail(params.id);
  const [isLoggedIn] = useState(false); // In a real app, this would come from auth context
  
  // Update document title when opportunity loads
  useEffect(() => {
    if (opportunity) {
      document.title = `${opportunity.title} | ${t('siteName')}`;
    } else {
      document.title = `${t('opportunityDetails')} | ${t('siteName')}`;
    }
    
    return () => {
      document.title = t('siteName');
    };
  }, [opportunity, t]);
  
  // Handle retry on error
  const handleRetry = () => {
    window.location.reload();
  };
  
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {loading && <DetailSkeleton />}
          
          {!loading && error && (
            <DetailError error={error} onRetry={handleRetry} />
          )}
          
          {!loading && !error && opportunity && (
            <>
              <DetailHeader
                title={opportunity.title}
                image={opportunity.image}
                category={opportunity.category}
                location={opportunity.location}
                date={opportunity.date}
                spots={opportunity.spots}
                featured={opportunity.featured}
              />
              
              <DetailContent
                description={opportunity.description}
                longDescription={opportunity.longDescription}
                requirements={opportunity.requirements}
                skills={opportunity.skills}
                timeCommitment={opportunity.timeCommitment}
                contactPerson={opportunity.contactPerson}
                contactEmail={opportunity.contactEmail}
              />
              
              <DetailActions
                status={opportunity.status}
                applicationDeadline={opportunity.applicationDeadline}
                isLoggedIn={isLoggedIn}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}