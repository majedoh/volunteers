// src/components/ui/ConfirmationDialog.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { 
  AlertTriangle, 
  Check, 
  X,
  Info,
  Trash,
  ShieldAlert
} from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: 'warning' | 'danger' | 'info' | 'success';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false,
  type = 'warning',
}) => {
  const { t } = useLanguage();
  
  // If dialog is not open, don't render anything
  if (!isOpen) return null;
  
  // Get the appropriate icon and colors based on the type
  const getIconAndColors = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <Trash className="h-6 w-6 text-red-600" />,
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          confirmBgColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          confirmBgColor: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
        };
      case 'info':
        return {
          icon: <Info className="h-6 w-6 text-blue-600" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100',
          confirmBgColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        };
      case 'success':
        return {
          icon: <Check className="h-6 w-6 text-green-600" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100',
          confirmBgColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        };
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          confirmBgColor: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
        };
    }
  };
  
  const { icon, bgColor, borderColor, confirmBgColor } = getIconAndColors();
  
  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`relative bg-white rounded-lg shadow-lg max-w-md w-full ${bgColor} border ${borderColor} overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          onClick={onClose}
          disabled={isLoading}
          aria-label={t('close')}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
          </div>
          
          {/* Message */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {message}
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText || t('cancel')}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-sm font-medium text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-100 disabled:cursor-not-allowed flex items-center gap-2 ${confirmBgColor}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('processing')}</span>
                </>
              ) : (
                <span>{confirmText || t('confirm')}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;