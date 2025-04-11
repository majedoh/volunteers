// src/app/admin/users/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import {
  ManagedUser,
  UserQueryParams,
  getMockUsers,
  simulateUserAction,
  ActionResponse
} from '@/types/user-management';
import UserTable from '@/components/admin/users/UserTable';
import UserDetailsModal from '@/components/admin/users/UserDetailsModal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserCheck, Shield, Bell } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type ActionType = 'admit' | 'revoke' | 'promote' | 'block' | 'delete';

const UserManagementPage: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get tab from URL or default to 'pending'
  const getTabFromUrl = (): 'pending' | 'active' | 'admin' => {
    const tab = searchParams.get('tab');
    if (tab === 'active' || tab === 'admin') return tab;
    return 'pending';
  };
  
  // State
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'admin'>(getTabFromUrl());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('joinedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: ActionType;
    user: ManagedUser;
  } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });
  
  // Fetch users based on current tab, search, and sort
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      
      // Determine query params based on active tab
      const queryParams: UserQueryParams = {
        sortBy: sortField,
        sortOrder: sortDirection,
        search: searchQuery,
      };
      
      if (activeTab === 'pending') {
        queryParams.status = 'pending';
      } else if (activeTab === 'active') {
        queryParams.status = 'active';
      } else if (activeTab === 'admin') {
        queryParams.role = 'admin';
      }
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get mock users
      const fetchedUsers = getMockUsers(queryParams);
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    
    fetchUsers();
  }, [activeTab, searchQuery, sortField, sortDirection]);
  
  // Update URL when tab changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', activeTab);
    router.replace(`${pathname}?${params.toString()}`);
  }, [activeTab, pathname, router, searchParams]);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'pending' | 'active' | 'admin');
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle view details
  const handleViewDetails = (user: ManagedUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  // Show toast message
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      visible: true,
      message,
      type,
    });
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  // Handle user action with confirmation dialog
  const handleAction = (user: ManagedUser, actionType: ActionType) => {
    setPendingAction({ type: actionType, user });
    setIsConfirmDialogOpen(true);
  };
  
  // Get confirmation message based on action type
  const getConfirmationMessage = (): { title: string; message: string } => {
    if (!pendingAction) {
      return { title: '', message: '' };
    }
    
    const { type, user } = pendingAction;
    
    switch (type) {
      case 'admit':
        return {
          title: t('confirmAdmit'),
          message: t('confirmAdmitMessage', { name: user.name }),
        };
      case 'revoke':
        return {
          title: t('confirmRevoke'),
          message: t('confirmRevokeMessage', { name: user.name }),
        };
      case 'promote':
        return {
          title: t('confirmPromote'),
          message: t('confirmPromoteMessage', { name: user.name }),
        };
      case 'block':
        return {
          title: t('confirmBlock'),
          message: t('confirmBlockMessage', { name: user.name }),
        };
      case 'delete':
        return {
          title: t('confirmDelete'),
          message: t('confirmDeleteMessage', { name: user.name }),
        };
      default:
        return {
          title: t('confirmAction'),
          message: t('confirmActionMessage'),
        };
    }
  };
  
  // Execute the pending action
  const executePendingAction = async () => {
    if (!pendingAction) return;
    
    const { type, user } = pendingAction;
    setIsActionLoading(true);
    
    try {
      // Simulate API call
      const response: ActionResponse = await simulateUserAction(user.id, type);
      
      if (response.success) {
        // Show success toast
        showToast(response.message, 'success');
        
        // Close modal if open
        if (isModalOpen) {
          setIsModalOpen(false);
        }
        
        // Remove user from current list if action changes their status/role
        if (
          (activeTab === 'pending' && type === 'admit') ||
          (activeTab === 'active' && (type === 'revoke' || type === 'promote'))
        ) {
          setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        }
        
        // Alternatively, update the user in the list
        else {
          setUsers(prevUsers =>
            prevUsers.map(u => (u.id === user.id && response.user ? response.user : u))
          );
        }
      } else {
        // Show error toast
        showToast(response.message, 'error');
      }
    } catch (error) {
      // Show error toast
      showToast(
        typeof error === 'string' 
          ? error 
          : error instanceof Error 
            ? error.message 
            : t('errorPerformingAction'),
        'error'
      );
    } finally {
      setIsActionLoading(false);
      setIsConfirmDialogOpen(false);
      setPendingAction(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('manageUsers')}
        </h1>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger 
            value="pending" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm focus:ring-blue-400"
          >
            <User className="h-4 w-4" />
            <span>{t('pendingUsers')}</span>
            {activeTab !== 'pending' && users.length > 0 && (
              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full text-xs">
                {users.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm focus:ring-blue-400"
          >
            <UserCheck className="h-4 w-4" />
            <span>{t('activeUsers')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="admin"
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm focus:ring-blue-400"
          >
            <Shield className="h-4 w-4" />
            <span>{t('adminUsers')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <UserTable
            users={users}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onAdmit={(user) => handleAction(user, 'admit')}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            userType="pending"
          />
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <UserTable
            users={users}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onRevoke={(user) => handleAction(user, 'revoke')}
            onPromote={(user) => handleAction(user, 'promote')}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            userType="active"
          />
        </TabsContent>
        
        <TabsContent value="admin" className="space-y-4">
          <UserTable
            users={users}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onRevoke={(user) => handleAction(user, 'revoke')}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            userType="admin"
          />
        </TabsContent>
      </Tabs>
      
      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdmit={(user) => handleAction(user, 'admit')}
        onRevoke={(user) => handleAction(user, 'revoke')}
        onPromote={(user) => handleAction(user, 'promote')}
        onBlock={(user) => handleAction(user, 'block')}
        isActionLoading={isActionLoading}
      />
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={executePendingAction}
        title={getConfirmationMessage().title}
        message={getConfirmationMessage().message}
        isLoading={isActionLoading}
        type={pendingAction?.type === 'admit' || pendingAction?.type === 'promote' ? 'success' : 'warning'}
      />
      
      {/* Toast Notification */}
      {toast.visible && (
        <div 
          className={`fixed bottom-4 right-4 py-2 px-4 rounded-md shadow-md flex items-center gap-2 transition-opacity ${
            toast.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {toast.type === 'success' ? (
            <Bell className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;