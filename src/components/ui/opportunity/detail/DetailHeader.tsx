// src/components/ui/opportunity/detail/DetailHeader.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import styles from '@/styles/opportunity/detail.module.css';

interface DetailHeaderProps {
  title: string;
  image: string;
  category: string;
  location: string;
  date: string;
  spots: number;
  featured: boolean;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  title,
  image,
  category,
  location,
  date,
  spots,
  featured,
}) => {
  const { t, dir } = useLanguage();
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  
  // Format date to be more readable if it's in ISO format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.backButtonContainer}>
        <Link href="/opportunities">
          <Button variant="outline" size="sm" className={styles.backButton}>
            <BackIcon className="h-4 w-4 mr-2" />
            {t('backToOpportunities')}
          </Button>
        </Link>
      </div>
      
      <div className={styles.heroImage}>
        <img 
          src={image} 
          alt={title} 
          className={styles.image}
        />
      </div>
      
      <div className={styles.titleContainer}>
        <div className={styles.meta}>
          {featured && (
            <Badge variant="accent" className={styles.featuredBadge}>
              <Award className="h-4 w-4 mr-1" />
              {t('featured')}
            </Badge>
          )}
          
          <Badge variant="outline" className={styles.categoryBadge}>
            <Tag className="h-4 w-4 mr-1" />
            {category}
          </Badge>
        </div>
        
        <h1 className={styles.title}>{title}</h1>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <MapPin className="h-5 w-5 text-primary" />
            <span>{location}</span>
          </div>
          
          <div className={styles.detailItem}>
            <Calendar className="h-5 w-5 text-primary" />
            <span>{formatDate(date)}</span>
          </div>
          
          <div className={styles.detailItem}>
            <Users className="h-5 w-5 text-primary" />
            <span>{spots} {t('spots')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;