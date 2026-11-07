import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col md:flex-row font-sans antialiased">
      <Helmet>
        <title>{title} | Metallix Admin Portal</title>
      </Helmet>

      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F8F9FA]">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onMobileMenuToggle={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-slate-200 text-center text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Metallix Trading LLC • Interactive Admin Management Demo. Persistent locally via browser storage.</span>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;

