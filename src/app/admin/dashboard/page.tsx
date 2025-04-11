// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import SummaryCard from '@/components/admin/SummaryCard';
import QuickActionButtons from '@/components/admin/QuickActionButtons';
import RecentApplications from '@/components/admin/RecentApplications';
import { getMockAdminSummaryData, AdminSummaryData } from '@/types/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  CalendarCheck, 
  ClipboardList, 
  Award, 
  Clock,
  AlertTriangle,
  ChevronDown,
  Shield,
  User
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [summaryData, setSummaryData] = useState<AdminSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API request with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get mock data
        const data = getMockAdminSummaryData();
        setSummaryData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-primary font-medium">{t('loadingDashboard')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-red-700">
              {t('errorLoadingDashboard')}
            </h2>
            <p className="text-red-600 mb-4">
              {error.message || t('somethingWentWrong')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
            >
              {t('tryAgain')}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summaryData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {t('welcomeAdmin')}, {user?.name}
              </h1>
              <p className="text-muted-foreground">
                {t('adminDashboardDesc')}
              </p>
            </div>
            <div className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
              {new Date().toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActionButtons />

      {/* User Stats Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          {t('userStatistics')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title={t('pendingUsers')}
            value={summaryData.pendingVolunteers}
            icon={<Users className="h-5 w-5" />}
            color="warning"
            actionHref="/admin/users?tab=pending"
            actionLabel={t('managePendingUsers')}
          />
          
          <SummaryCard 
            title={t('activeVolunteers')}
            value={formatNumber(summaryData.activeVolunteers)}
            icon={<UserCheck className="h-5 w-5" />}
            description={t('approvedVolunteers')}
            color="primary"
            actionHref="/admin/users?tab=active"
            actionLabel={t('viewAllVolunteers')}
          />
          
          <SummaryCard 
            title={t('adminUsers')}
            value="3"
            icon={<Shield className="h-5 w-5" />}
            description={t('platformAdministrators')}
            color="secondary"
            actionHref="/admin/users?tab=admin"
            actionLabel={t('viewAdmins')}
          />
          
          <SummaryCard 
            title={t('totalUsers')}
            value={formatNumber(summaryData.activeVolunteers + summaryData.pendingVolunteers + 3)}
            icon={<User className="h-5 w-5" />}
            description={t('allUserTypes')}
            color="accent"
            actionHref="/admin/users"
            actionLabel={t('manageAllUsers')}
          />
        </div>
      </div>
      
      {/* Opportunity Stats Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <CalendarCheck className="h-5 w-5 mr-2" />
          {t('opportunityStatistics')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">        
          <SummaryCard 
            title={t('pendingOpportunities')}
            value={summaryData.pendingOpportunities}
            icon={<ClipboardList className="h-5 w-5" />}
            trend={{ value: 20, isPositive: true }}
            color="warning"
            actionHref="/admin/opportunities/pending"
            actionLabel={t('manageOpportunities')}
          />
          
          <SummaryCard 
            title={t('activeOpportunities')}
            value={summaryData.activeOpportunities}
            icon={<CalendarCheck className="h-5 w-5" />}
            color="success"
            actionHref="/admin/opportunities/active"
            actionLabel={t('viewActiveOpportunities')}
          />
          
          <SummaryCard 
            title={t('completedOpportunities')}
            value={summaryData.completedOpportunities}
            icon={<Award className="h-5 w-5" />}
            description={t('totalCompletedOpportunities')}
            color="secondary"
            actionHref="/admin/opportunities/completed"
            actionLabel={t('viewCompletedOpportunities')}
          />
          
          <SummaryCard 
            title={t('volunteerHours')}
            value={formatNumber(summaryData.totalVolunteerHours)}
            icon={<Clock className="h-5 w-5" />}
            description={t('totalHoursContributed')}
            color="accent"
            actionHref="/admin/reports/hours"
            actionLabel={t('viewHoursReport')}
          />
        </div>
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentApplications 
            applications={summaryData.recentApplications} 
          />
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Award className="h-5 w-5 mr-2" />
                {t('upcomingEvents')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{t('ramadanPreparation')}</h4>
                      <p className="text-sm text-muted-foreground">{t('ramadanPreparationDate')}</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                      {t('upcoming')}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{t('ramadanPreparationDesc')}</p>
                </div>
                
                <div className="border p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{t('volunteerTraining')}</h4>
                      <p className="text-sm text-muted-foreground">{t('volunteerTrainingDate')}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {t('registration')}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{t('volunteerTrainingDesc')}</p>
                </div>
                
                <button className="w-full text-primary text-sm font-medium hover:underline flex items-center justify-center mt-2">
                  <span>{t('viewAllEvents')}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;