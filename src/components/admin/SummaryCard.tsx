// src/components/admin/SummaryCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  actionHref?: string;
  actionLabel?: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  actionHref,
  actionLabel,
  color = 'default',
}) => {
  const { dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Define color classes based on the color prop
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'secondary':
        return 'bg-secondary/10 text-secondary-foreground';
      case 'accent':
        return 'bg-accent/10 text-accent';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500';
      case 'success':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden border shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${getColorClasses()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            <span>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground ml-1 mr-1">
              from last month
            </span>
          </div>
        )}
        
        {actionHref && actionLabel && (
          <div className="mt-4">
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="px-0 text-primary hover:text-primary/90 hover:bg-transparent group"
            >
              <Link href={actionHref}>
                <span>{actionLabel}</span>
                <ArrowIcon className="h-4 w-4 ml-1 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;