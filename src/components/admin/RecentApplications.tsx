// src/components/admin/RecentApplications.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { VolunteerApplication } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Calendar, ArrowRight, ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';

interface RecentApplicationsProps {
  applications: VolunteerApplication[];
}

const RecentApplications: React.FC<RecentApplicationsProps> = ({ 
  applications 
}) => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Format date to be more human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} ${t('minutesAgo')}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${t('hoursAgo')}`;
    } else {
      return `${diffDays} ${t('daysAgo')}`;
    }
  };

  // Get avatar fallback initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <UserCheck className="h-5 w-5 mr-2" />
          {t('recentApplications')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {applications.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              {t('noRecentApplications')}
            </p>
          ) : (
            applications.map((app) => (
              <div 
                key={app.id} 
                className="flex items-start gap-3 pb-5 border-b last:border-0 last:pb-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.volunteerName)}&background=0D8ABC&color=fff`} />
                  <AvatarFallback>{getInitials(app.volunteerName)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm truncate">{app.volunteerName}</h4>
                      <p className="text-xs text-muted-foreground truncate">{app.volunteerEmail}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(app.appliedAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm mt-1 truncate">{app.opportunityTitle}</p>
                  
                  <div className="flex mt-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      {t('approve')}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      {t('reject')}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {applications.length > 0 && (
          <div className="mt-4 text-center">
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="text-primary hover:text-primary/90 hover:bg-transparent group"
            >
              <Link href="/admin/applications">
                <span>{t('viewAllApplications')}</span>
                <ArrowIcon className="h-4 w-4 ml-1 mr-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentApplications;