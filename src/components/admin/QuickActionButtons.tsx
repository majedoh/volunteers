// src/components/admin/QuickActionButtons.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import {
  PlusCircle,
  UserPlus,
  ListPlus,
  MessageSquarePlus,
  Share2,
  FileSpreadsheet,
  Calendar
} from 'lucide-react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  label, 
  href,
  color = 'bg-primary' 
}) => {
  return (
    <Link 
      href={href}
      className="block"
    >
      <Button
        variant="outline"
        size="lg"
        className="w-full h-auto flex flex-col items-center p-4 gap-3 hover:border-primary/60 hover:bg-primary/5 transition-all group"
      >
        <div className={`${color} text-white p-3 rounded-full transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </Button>
    </Link>
  );
};

const QuickActionButtons: React.FC = () => {
  const { t } = useLanguage();
  
  const actions = [
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: t('addVolunteer'),
      href: '/admin/volunteers/new',
      color: 'bg-blue-500'
    },
    {
      icon: <ListPlus className="h-5 w-5" />,
      label: t('createOpportunity'),
      href: '/admin/opportunities/new',
      color: 'bg-green-500'
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: t('scheduleEvent'),
      href: '/admin/events/new',
      color: 'bg-purple-500'
    },
    {
      icon: <MessageSquarePlus className="h-5 w-5" />,
      label: t('sendAnnouncement'),
      href: '/admin/announcements/new',
      color: 'bg-amber-500'
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      label: t('shareOpportunity'),
      href: '/admin/share',
      color: 'bg-pink-500'
    },
    {
      icon: <FileSpreadsheet className="h-5 w-5" />,
      label: t('exportReport'),
      href: '/admin/reports/export',
      color: 'bg-teal-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          {t('quickActions')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <QuickAction
              key={index}
              icon={action.icon}
              label={action.label}
              href={action.href}
              color={action.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionButtons;