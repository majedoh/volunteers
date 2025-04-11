// src/components/ui/OpportunityCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { ArrowRight, ArrowLeft, Users, Calendar, MapPin } from 'lucide-react';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  location?: string;
  date?: string;
  spots?: number;
  featured?: boolean;
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
}) => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border ${
      featured ? 'border-accent shadow-md' : 'border-neutral-200'
    }`}>
      {/* Opportunity Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 text-sm font-medium rounded-full">
            Featured
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-primary-dark">{title}</CardTitle>
        {(location || date) && (
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
                <span>{date}</span>
              </div>
            )}
            {spots !== undefined && (
              <div className="flex items-center gap-1 text-neutral-500 text-sm">
                <Users className="h-4 w-4 text-primary-light" />
                <span>{spots} spots</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3 text-neutral-600 min-h-[4.5rem]">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="default" 
          className="w-full mt-2 group"
        >
          <span>{t('heroButtonText')}</span>
          <ArrowIcon className="h-4 w-4 ml-1 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;