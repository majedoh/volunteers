// src/components/admin/users/UserDetailsModal.tsx
'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { ManagedUser } from '@/types/user-management';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Award, 
  UserCheck, 
  UserX, 
  Shield,
  CheckCircle,
  XCircle,
  ExternalLink,
  User 
} from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface UserDetailsModalProps {
  user: ManagedUser | null;
  isOpen: boolean;
  onClose: () => void;
  onAdmit?: (user: ManagedUser) => void;
  onRevoke?: (user: ManagedUser) => void;
  onPromote?: (user: ManagedUser) => void;
  onBlock?: (user: ManagedUser) => void;
  isActionLoading?: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  isOpen,
  onClose,
  onAdmit,
  onRevoke,
  onPromote,
  onBlock,
  isActionLoading = false,
}) => {
  const { t, language, dir } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  // If not open or no user, don't render
  if (!isOpen || !user) return null;
  
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
  
  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isActionLoading) {
      onClose();
    }
  };
  
  // Handle document click
  const handleDocumentClick = (documentUrl: string) => {
    setSelectedDocument(documentUrl);
  };
  
  // Close document preview
  const closeDocumentPreview = () => {
    setSelectedDocument(null);
  };
  
  // Determine if user can be admitted
  const canAdmit = user.status === 'pending' && onAdmit;
  
  // Determine if user can be revoked
  const canRevoke = user.status === 'active' && onRevoke;
  
  // Determine if user can be promoted
  const canPromote = user.status === 'active' && user.role === 'user' && onPromote;
  
  // Determine if user can be blocked
  const canBlock = user.status !== 'blocked' && onBlock;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50 z-10"
          onClick={onClose}
          disabled={isActionLoading}
          aria-label={t('close')}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side - user info */}
          <div className="p-6 flex-1">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div className="ml-4 mr-4">
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className={`mr-2 ${
                      user.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : user.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : user.status === 'blocked'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {t(user.status)}
                  </Badge>
                  
                  <Badge
                    variant="outline"
                    className={`${
                      user.role === 'admin'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : user.role === 'super_admin'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {t(user.role)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                <span className="text-gray-700">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                  <span className="text-gray-700">{user.phone}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                <span className="text-gray-700">
                  {t('joinedOn')}: {formatDate(user.joinedAt)}
                </span>
              </div>
              
              {user.lastActive && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                  <span className="text-gray-700">
                    {t('lastActive')}: {formatDate(user.lastActive)}
                  </span>
                </div>
              )}
              
              {user.completedOpportunities !== undefined && (
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                  <span className="text-gray-700">
                    {t('completedOpportunities')}: {user.completedOpportunities}
                  </span>
                </div>
              )}
              
              {user.totalHours !== undefined && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 ml-1" />
                  <span className="text-gray-700">
                    {t('totalHours')}: {user.totalHours}
                  </span>
                </div>
              )}
              
              <div className="flex items-center">
                {user.nationalIdVerified ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 ml-1" />
                    <span className="text-green-700">{t('nationalIdVerified')}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500 mr-3 ml-1" />
                    <span className="text-red-700">{t('nationalIdNotVerified')}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {canAdmit && (
                <Button
                  onClick={() => onAdmit(user)}
                  disabled={isActionLoading}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  {isActionLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('admitting')}</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4" />
                      <span>{t('admit')}</span>
                    </>
                  )}
                </Button>
              )}
              
              {canRevoke && (
                <Button
                  onClick={() => onRevoke(user)}
                  disabled={isActionLoading}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 flex items-center gap-2"
                >
                  {isActionLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('revoking')}</span>
                    </>
                  ) : (
                    <>
                      <UserX className="h-4 w-4" />
                      <span>{t('revoke')}</span>
                    </>
                  )}
                </Button>
              )}
              
              {canPromote && (
                <Button
                  onClick={() => onPromote(user)}
                  disabled={isActionLoading}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                >
                  {isActionLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('promoting')}</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>{t('promote')}</span>
                    </>
                  )}
                </Button>
              )}
              
              {canBlock && (
                <Button
                  onClick={() => onBlock(user)}
                  disabled={isActionLoading}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>{t('block')}</span>
                </Button>
              )}
            </div>
          </div>
          
          {/* Right side - documents */}
          {user.documents && (user.documents.nationalId || user.documents.selfie) && (
            <div className="bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-200 md:w-64">
              <h4 className="font-medium text-gray-900 mb-4">{t('documents')}</h4>
              
              <div className="space-y-4">
                {user.documents.nationalId && (
                  <div>
                    <h5 className="text-sm text-gray-600 mb-2">{t('nationalId')}</h5>
                    <div 
                      className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleDocumentClick(user.documents.nationalId!)}
                    >
                      <div className="aspect-[3/2] bg-gray-100 flex items-center justify-center">
                        {/* Placeholder for national ID image */}
                        <img 
                          src={user.documents.nationalId} 
                          alt={t('nationalId')}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="p-2 bg-white text-xs flex items-center justify-between">
                        <span className="truncate">{t('viewFullSize')}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                )}
                
                {user.documents.selfie && (
                  <div>
                    <h5 className="text-sm text-gray-600 mb-2">{t('selfie')}</h5>
                    <div 
                      className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleDocumentClick(user.documents.selfie!)}
                    >
                      <div className="aspect-[3/2] bg-gray-100 flex items-center justify-center">
                        {/* Placeholder for selfie image */}
                        <img 
                          src={user.documents.selfie} 
                          alt={t('selfie')}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="p-2 bg-white text-xs flex items-center justify-between">
                        <span className="truncate">{t('viewFullSize')}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Full-size document viewer */}
      {selectedDocument && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeDocumentPreview}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeDocumentPreview}
          >
            <X className="h-6 w-6" />
          </button>
          
          <img 
            src={selectedDocument} 
            alt={t('document')}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default UserDetailsModal;