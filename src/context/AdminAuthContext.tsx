import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AdminUser } from '../types';
import { STORAGE_KEYS, loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const DEMO_USER_DEFAULT: AdminUser = {
  id: 'usr-admin-01',
  name: 'Metallix Administrator',
  email: 'admin@metallixtrading.com',
  role: 'Store Administrator',
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    return loadFromStorage<AdminUser | null>(STORAGE_KEYS.AUTH, null);
  });

  const isAuthenticated = !!currentUser;

  useEffect(() => {
    if (currentUser) {
      saveToStorage(STORAGE_KEYS.AUTH, currentUser);
    } else {
      removeFromStorage(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Basic frontend demo validation
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid administrator email address.' };
    }
    if (!pass || pass.trim().length < 4) {
      return { success: false, error: 'Password must be at least 4 characters for this demo.' };
    }

    const user: AdminUser = {
      ...DEMO_USER_DEFAULT,
      email: email.trim(),
    };

    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    removeFromStorage(STORAGE_KEYS.AUTH);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminAuthContext;

