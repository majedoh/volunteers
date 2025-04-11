// src/app/opportunities/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import Layout from '@/components/layout/Layout';
import FilterSection from '@/components/ui/filters/FilterSection';
import OpportunityCard from '@/components/ui/opportunity/OpportunityCard';
import OpportunityCardSkeleton from '@/components/ui/opportunity/OpportunityCardSkeleton';
import EmptyState from '@/components/ui/opportunity/EmptyState';
import ErrorState from '@/components/ui/opportunity/ErrorState';
import Pagination from '@/components/ui/Pagination';
import { useOpportunities } from '@/hooks/api/useOpportunities';
import styles from '@/styles/opportunities.module.css';

export default function OpportunitiesPage() {
  const { t } = useLanguage();
  
  // Filter state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  
  // Options for filters
  const categoryOptions = [
    { value: 'Translation', label: t('categoryTranslation') },
    { value: 'Guidance', label: t('categoryGuidance') },
    { value: 'Assistance', label: t('categoryAssistance') },
    { value: 'Services', label: t('categoryServices') },
    { value: 'Education', label: t('categoryEducation') },
  ];
  
  const locationOptions = [
    { value: 'Makkah', label: t('locationMakkah') },
    { value: 'Madinah', label: t('locationMadinah') },
    { value: 'Jeddah', label: t('locationJeddah') },
  ];
  
  // Fetch opportunities
  const { opportunities, loading, error, totalPages } = useOpportunities({
    search,
    category,
    location,
    dateFrom: fromDate,
    dateTo: toDate,
    page,
    pageSize: 6,
  });
  
  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, location, fromDate, toDate]);
  
  // Reset all filters
  const handleReset = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setFromDate('');
    setToDate('');
    setPage(1);
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Retry on error
  const handleRetry = () => {
    // The useOpportunities hook will automatically retry the fetch
    setPage(page);
  };
  
  return (
    <Layout>
      <section className={styles.opportunitiesSection}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className={styles.pageTitle}>{t('volunteerOpportunities')}</h1>
            <p className={styles.pageDescription}>{t('exploreOpportunitiesDesc')}</p>
          </div>
              
          <div className={styles.grid}>
            {/* Filters Column */}
            <div className={styles.filtersColumn}>
              <FilterSection 
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                location={location}
                onLocationChange={setLocation}
                fromDate={fromDate}
                onFromDateChange={setFromDate}
                toDate={toDate}
                onToDateChange={setToDate}
                onReset={handleReset}
                categoryOptions={categoryOptions}
                locationOptions={locationOptions}
              />
            </div>
            
            {/* Opportunities Column */}
            <div className={styles.opportunitiesColumn}>
              {/* Results summary */}
              {!loading && !error && opportunities.length > 0 && (
                <div className={styles.resultsSummary}>
                  <span>
                    {t('showing')} {opportunities.length} {t('of')} {totalPages * 6} {t('opportunities')}
                  </span>
                  <span>
                    {t('page')} {page} {t('of')} {totalPages}
                  </span>
                </div>
              )}
              
              {/* Loading state */}
              {loading && (
                <div className={styles.cardsGrid}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <OpportunityCardSkeleton key={index} />
                  ))}
                </div>
              )}
              
              {/* Error state */}
              {!loading && error && (
                <ErrorState error={error} onRetry={handleRetry} />
              )}
              
              {/* Empty state */}
              {!loading && !error && opportunities.length === 0 && (
                <EmptyState onReset={handleReset} />
              )}
              
              {/* Results */}
              {!loading && !error && opportunities.length > 0 && (
                <div className={styles.cardsGrid}>
                  {opportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      id={opportunity.id}
                      title={opportunity.title}
                      description={opportunity.description}
                      image={opportunity.image}
                      location={opportunity.location}
                      date={opportunity.date}
                      spots={opportunity.spots}
                      featured={opportunity.featured}
                      category={opportunity.category}
                    />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {!loading && !error && totalPages > 1 && (
                <div className={styles.paginationContainer}>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}