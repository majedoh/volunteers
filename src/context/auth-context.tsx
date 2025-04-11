'use client';

// src/context/auth-context.tsx (SIMULATED FOR DEVELOPMENT)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@/types/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  isAdmin: boolean;
  // Dev-only functions
  toggleAdminStatus: () => void;
}

// Create context with default values
const defaultContextValue: AuthContextType = {
  user: null,
  session: null,
  status: 'unauthenticated',
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
  isAdmin: false,
  toggleAdminStatus: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('unauthenticated');

  // Simulate loading stored auth state on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('simulatedAuth');
      if (storedAuth) {
        const { user, isAdmin } = JSON.parse(storedAuth);
        setUser(user);
        setIsAdmin(isAdmin);
        setStatus('authenticated');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Save auth state to localStorage when it changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('simulatedAuth', JSON.stringify({ user, isAdmin }));
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    } else {
      try {
        localStorage.removeItem('simulatedAuth');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  }, [user, isAdmin]);

  const signInWithGoogle = async () => {
    try {
      setStatus('loading');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set admin to true for development purposes
      const newIsAdmin = true;
      setIsAdmin(newIsAdmin);
      
      // Create a mock user
      const mockUser: User = {
        id: '123456',
        name: 'Admin User',
        email: 'admin@haramainvolunteers.org',
        image: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
        role: newIsAdmin ? 'admin' : 'user',
      };
      
      setUser(mockUser);
      setStatus('authenticated');
      
      // Redirect to admin dashboard if admin
      if (newIsAdmin) {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error in simulated sign in:', error);
      setStatus('unauthenticated');
    }
  };

  const signOutUser = async () => {
    try {
      setStatus('loading');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setStatus('unauthenticated');
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error in simulated sign out:', error);
    }
  };

  // Development-only helper to toggle admin status
  const toggleAdminStatus = () => {
    if (user) {
      const newIsAdmin = !isAdmin;
      setIsAdmin(newIsAdmin);
      
      // Update the user role to match
      setUser({
        ...user,
        role: newIsAdmin ? 'admin' : 'user',
      });
      
      // Redirect to admin dashboard if becoming admin
      if (newIsAdmin) {
        router.push('/admin/dashboard');
      } else {
        // Redirect to home if losing admin status
        router.push('/');
      }
    }
  };

  // Create a mock session that matches the expected structure
  const session: Session | null = user ? {
    user,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Expires in 24 hours
  } : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        status,
        signInWithGoogle,
        signOutUser,
        isAdmin,
        toggleAdminStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};