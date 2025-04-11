// src/components/ui/opportunity/OpportunityCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { ArrowRight, ArrowLeft, Users, Calendar, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  date?: string;
  spots?: number;
  featured?: boolean;
  category?: string;
  className?: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  id,
  title,
  description,
  image,
  location,
  date,
  spots,
  featured = false,
  category,
  className = '',
}) => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
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
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border h-full ${
      featured ? 'border-accent shadow-md' : 'border-neutral-200'
    } ${className}`}>
      {/* Opportunity Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 text-sm font-medium rounded-full">
            {t('featured')}
          </div>
        )}
        {category && (
          <Badge variant="secondary" className="absolute bottom-4 left-4">
            <Tag className="h-3 w-3 mr-1" />
            {category}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-primary-dark">{title}</CardTitle>
        {(location || date || spots !== undefined) && (
          <div className="flex flex-wrap gap-3 mt-2">
            {location && (
              <div className="flex items-center gap-1 text-neutral-500 text-sm">
                <MapPin className="h-4 w-4 text-primary-light" />
                <span>{location}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-1 text-neutral-500 text-sm">
                <Calendar className="h-4 w-4 text-primary-light" />
                <span>{formatDate(date)}</span>
              </div>
            )}
            {spots !== undefined && (
              <div className="flex items-center gap-1 text-neutral-500 text-sm">
                <Users className="h-4 w-4 text-primary-light" />
                <span>{spots} {t('spots')}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3 text-neutral-600">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link href={`/opportunities/${id}`} className="w-full">
          <Button 
            variant="default" 
            className="w-full mt-2 group"
          >
            <span>{t('viewDetails')}</span>
            <ArrowIcon className="h-4 w-4 ml-1 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;