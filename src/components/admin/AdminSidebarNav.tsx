// src/components/admin/AdminSidebarNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { 
  LayoutDashboard, 
  Users, 
  UserCog,
  ClipboardList, 
  Settings, 
  BarChart, 
  Calendar, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-blue-600 text-blue shadow-sm'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

const NavSection: React.FC<NavSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs uppercase font-semibold text-gray-500 mb-2 px-3">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const AdminSidebarNav: React.FC = () => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const mainNavItems = [
    {
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t('dashboard'),
    },
    {
      href: '/admin/users',
      icon: <UserCog className="h-5 w-5" />,
      label: t('manageUsers'),
    },
    {
      href: '/admin/volunteers',
      icon: <Users className="h-5 w-5" />,
      label: t('volunteers'),
    },
    {
      href: '/admin/opportunities',
      icon: <ClipboardList className="h-5 w-5" />,
      label: t('opportunities'),
    },
    {
      href: '/admin/applications',
      icon: <Calendar className="h-5 w-5" />,
      label: t('applications'),
    },
  ];

  const reportingNavItems = [
    {
      href: '/admin/reports',
      icon: <BarChart className="h-5 w-5" />,
      label: t('reports'),
    },
    {
      href: '/admin/feedback',
      icon: <MessageSquare className="h-5 w-5" />,
      label: t('feedback'),
    },
  ];

  const systemNavItems = [
    {
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      label: t('settings'),
    },
    {
      href: '/admin/help',
      icon: <HelpCircle className="h-5 w-5" />,
      label: t('help'),
    },
  ];

  // Check if a path is active, including partial matching for nested routes
  const isPathActive = (path: string): boolean => {
    if (path === '/admin/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto py-6 px-2 hidden md:block">
      <NavSection title={t('management')}>
        {mainNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={isPathActive(item.href)}
          />
        ))}
      </NavSection>

      <NavSection title={t('reporting')}>
        {reportingNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={isPathActive(item.href)}
          />
        ))}
      </NavSection>

      <NavSection title={t('system')}>
        {systemNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={isPathActive(item.href)}
          />
        ))}
      </NavSection>
    </aside>
  );
};

export default AdminSidebarNav;