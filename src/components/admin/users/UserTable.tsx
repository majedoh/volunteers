// src/components/admin/users/UserTable.tsx
'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { ManagedUser, UserStatus, UserRole } from '@/types/user-management';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowUpDown, MoreHorizontal, UserCheck, UserX, Shield, EyeIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface UserTableProps {
  users: ManagedUser[];
  isLoading: boolean;
  onViewDetails: (user: ManagedUser) => void;
  onAdmit?: (user: ManagedUser) => void;
  onRevoke?: (user: ManagedUser) => void;
  onPromote?: (user: ManagedUser) => void;
  onBlock?: (user: ManagedUser) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onSort: (field: string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  userType: 'pending' | 'active' | 'admin';
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onViewDetails,
  onAdmit,
  onRevoke,
  onPromote,
  onBlock,
  onSearch,
  searchQuery,
  onSort,
  sortField,
  sortDirection,
  userType,
}) => {
  const { t, language, dir } = useLanguage();
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  
  // Handle sort click
  const handleSortClick = (field: string) => {
    onSort(field);
  };
  
  // Get sort indicator
  const getSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    
    return (
      <span className="inline-block">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };
  
  // Format date based on locale
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PPP', {
        locale: language === 'ar' ? ar : enUS
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{t('pending')}</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t('active')}</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{t('inactive')}</Badge>;
      case 'blocked':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t('blocked')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get role badge
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{t('admin')}</Badge>;
      case 'super_admin':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t('superAdmin')}</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{t('volunteer')}</Badge>;
    }
  };
  
  // Render empty state
  if (users.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 mb-4">
            <UserX className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('noUsersFound')}
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            {userType === 'pending' 
              ? t('noPendingUsers') 
              : userType === 'admin' 
                ? t('noAdminUsers') 
                : t('noActiveUsers')}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              onClick={() => onSearch('')}
            >
              {t('clearSearch')}
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="w-full p-2 ps-10 text-sm border rounded-lg bg-white focus:ring-primary focus:border-primary"
            placeholder={t('searchUsers')}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortClick('name')}
              >
                <div className="flex items-center">
                  {t('name')}
                  <ArrowUpDown className="h-4 w-4 ml-1 mr-1" />
                  {getSortIndicator('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortClick('email')}
              >
                <div className="flex items-center">
                  {t('email')}
                  <ArrowUpDown className="h-4 w-4 ml-1 mr-1" />
                  {getSortIndicator('email')}
                </div>
              </th>
              {userType === 'admin' && (
                <th scope="col" className="px-6 py-3">
                  {t('role')}
                </th>
              )}
              {userType !== 'pending' && (
                <th 
                  scope="col" 
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => handleSortClick('lastActive')}
                >
                  <div className="flex items-center">
                    {t('lastActive')}
                    <ArrowUpDown className="h-4 w-4 ml-1 mr-1" />
                    {getSortIndicator('lastActive')}
                  </div>
                </th>
              )}
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSortClick('joinedAt')}
              >
                <div className="flex items-center">
                  {t('joinedAt')}
                  <ArrowUpDown className="h-4 w-4 ml-1 mr-1" />
                  {getSortIndicator('joinedAt')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3"
              >
                {t('status')}
              </th>
              <th scope="col" className="px-6 py-3">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading state - show skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  {userType === 'admin' && (
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  )}
                  {userType !== 'pending' && (
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  )}
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded"></div></td>
                </tr>
              ))
            ) : (
              // Actual data
              users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  {userType === 'admin' && (
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                  )}
                  {userType !== 'pending' && (
                    <td className="px-6 py-4">
                      {user.lastActive ? formatDate(user.lastActive) : '-'}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    {formatDate(user.joinedAt)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(user)}
                        className="h-8 px-2"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {t('view')}
                      </Button>
                      
                      {userType === 'pending' && onAdmit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAdmit(user)}
                          className="h-8 px-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          {t('admit')}
                        </Button>
                      )}
                      
                      {userType === 'active' && onRevoke && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRevoke(user)}
                          className="h-8 px-2 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          {t('revoke')}
                        </Button>
                      )}
                      
                      {userType === 'active' && onPromote && user.role === 'user' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPromote(user)}
                          className="h-8 px-2 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          {t('promote')}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination could be added here */}
      
    </div>
  );
};

export default UserTable;