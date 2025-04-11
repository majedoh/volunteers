// src/components/ui/opportunity/OpportunityCardSkeleton.tsx
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface OpportunityCardSkeletonProps {
  className?: string;
}

const OpportunityCardSkeleton: React.FC<OpportunityCardSkeletonProps> = ({
  className = '',
}) => {
  return (
    <Card className={`overflow-hidden border border-neutral-200 h-full ${className}`}>
      {/* Image skeleton */}
      <div className="relative aspect-video bg-gray-200 animate-pulse"></div>
      
      <CardHeader className="pb-2">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-3"></div>
        
        {/* Meta info skeleton */}
        <div className="flex gap-3 mt-2">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full mt-2"></div>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCardSkeleton;