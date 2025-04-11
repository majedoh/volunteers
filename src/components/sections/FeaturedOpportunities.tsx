// src/components/sections/FeaturedOpportunities.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import OpportunityCard from '@/components/ui/OpportunityCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const FeaturedOpportunities: React.FC = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
  // Sample opportunity data
  // In a real application, this would come from an API or CMS
  const opportunities = [
    {
      id: '1',
      title: t('opportunity1Title'),
      description: t('opportunity1Description'),
      image: '/images/opportunity1.jpg',
      location: 'Makkah',
      date: '2023-05-15',
      spots: 25,
      featured: true,
    },
    {
      id: '2',
      title: t('opportunity2Title'),
      description: t('opportunity2Description'),
      image: '/images/opportunity2.jpg',
      location: 'Madinah',
      date: '2023-06-10',
      spots: 15,
      featured: false,
    },
    {
      id: '3',
      title: t('opportunity3Title'),
      description: t('opportunity3Description'),
      image: '/images/opportunity3.jpg',
      location: 'Makkah',
      date: '2023-05-20',
      spots: 30,
      featured: true,
    }
  ];
  
  return (
    <section id="opportunities" className="section bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('featuredOpportunities')}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="group"
          >
            <span>{t('viewAllOpportunities')}</span>
            <ArrowIcon className="h-4 w-4 ml-1 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;