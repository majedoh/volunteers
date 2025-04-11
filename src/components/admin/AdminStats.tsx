// src/components/admin/AdminStats.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, Award, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
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
      </CardContent>
    </Card>
  );
};

const AdminStats: React.FC = () => {
  const { t } = useLanguage();
  
  // In a real application, these would come from API calls
  const statsData = [
    {
      title: t('totalVolunteers'),
      value: 5243,
      icon: <Users className="h-4 w-4" />,
      description: t('activeVolunteers'),
      trend: { value: 12, isPositive: true }
    },
    {
      title: t('totalOpportunities'),
      value: 187,
      icon: <CalendarCheck className="h-4 w-4" />,
      description: t('activeOpportunities'),
      trend: { value: 8, isPositive: true }
    },
    {
      title: t('completedOpportunities'),
      value: 734,
      icon: <Award className="h-4 w-4" />,
      description: t('pastMonth'),
      trend: { value: 4, isPositive: true }
    },
    {
      title: t('volunteerHours'),
      value: '10,325',
      icon: <Clock className="h-4 w-4" />,
      description: t('totalHours'),
      trend: { value: 6, isPositive: true }
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default AdminStats;