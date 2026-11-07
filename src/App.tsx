import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { WebsiteDataProvider } from './context/WebsiteDataContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

export const App: React.FC = () => {
  return (
    <WebsiteDataProvider>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </WebsiteDataProvider>
  );
};

export default App;
