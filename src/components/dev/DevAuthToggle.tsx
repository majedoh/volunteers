// src/components/dev/DevAuthToggle.tsx
'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck } from 'lucide-react';

/**
 * This is a development-only component for toggling authentication states
 * It should NOT be included in production builds
 */
const DevAuthToggle: React.FC = () => {
  const { status, isAdmin, toggleAdminStatus } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 bg-black/80 text-white rounded-lg shadow-lg">
      <div className="text-xs mb-2 font-mono">DEV AUTH CONTROLS</div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span>Status:</span>
          <span className={`px-2 py-0.5 rounded ${
            status === 'authenticated' 
              ? 'bg-green-500 text-white' 
              : status === 'loading' 
                ? 'bg-yellow-500 text-white'
                : 'bg-red-500 text-white'
          }`}>
            {status}
          </span>
        </div>

        {status === 'authenticated' && (
          <div className="flex items-center justify-between text-xs">
            <span>Role:</span>
            <Button 
              size="sm" 
              variant={isAdmin ? 'default' : 'outline'} 
              className="h-6 text-xs"
              onClick={toggleAdminStatus}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Admin
                </>
              ) : (
                <>
                  <Shield className="h-3 w-3 mr-1" />
                  User
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevAuthToggle;