import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Shield,
  Inbox,
  FolderGit2,
  Home,
  Settings,
  ArrowUpRight,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useWebsiteData } from '../../context/WebsiteDataContext';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const { logout, currentUser } = useAdminAuth();
  const { enquiries } = useWebsiteData();

  const pendingEnquiriesCount = enquiries.filter(
    (e) => e.status === 'New' || e.status === 'Pending' || e.status === 'In Progress'
  ).length;

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Brands', path: '/admin/brands', icon: Shield },
    {
      label: 'Enquiries',
      path: '/admin/enquiries',
      icon: Inbox,
      badge: pendingEnquiriesCount > 0 ? pendingEnquiriesCount : undefined,
    },
    { label: 'Projects & Gallery', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Homepage Content', path: '/admin/homepage', icon: Home },
    { label: 'Company Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') return location.pathname === '/admin/dashboard' || location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#17191C] text-[#F5F5F2] border-r border-[#BFC3C8]/10 select-none overflow-hidden">
      {/* Top Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#BFC3C8]/10 shrink-0">
        <Link
          to="/admin/dashboard"
          className={`flex items-center space-x-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#B69A69] via-[#8E949C] to-[#17191C] p-[1.5px] shrink-0">
            <div className="w-full h-full bg-[#17191C] rounded-[6.5px] flex items-center justify-center">
              <span className="font-heading font-black text-lg text-[#B69A69]">M</span>
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-heading font-black text-base tracking-wider text-[#F5F5F2] leading-none">
                METALLIX
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#B69A69] font-bold mt-1">
                MANAGEMENT CMS
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-[#BFC3C8] hover:text-[#F5F5F2] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[#23272C] cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group min-h-[44px] ${
                active
                  ? 'bg-[#B69A69] text-[#17191C] shadow-md shadow-[#B69A69]/20 font-bold'
                  : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
              } ${collapsed ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#17191C]' : 'text-[#B69A69] group-hover:scale-110 transition-transform'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>
              {!collapsed && item.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    active ? 'bg-[#17191C] text-[#B69A69]' : 'bg-[#B69A69] text-[#17191C]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer controls & user */}
      <div className="p-3 border-t border-[#BFC3C8]/10 space-y-2 shrink-0">
        {/* User preview */}
        {!collapsed && currentUser && (
          <div className="px-3 py-2 rounded-lg bg-[#23272C]/50 border border-[#BFC3C8]/10 flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-[#B69A69]/20 border border-[#B69A69]/40 flex items-center justify-center text-[11px] font-bold text-[#B69A69]">
              {currentUser.name.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-[#F5F5F2] truncate">{currentUser.name}</div>
              <div className="text-[10px] text-[#BFC3C8]/70 truncate">{currentUser.email}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'Public Website' : undefined}
            className={`flex items-center rounded-lg px-3 py-2 text-xs font-medium text-[#BFC3C8] hover:text-[#B69A69] hover:bg-[#23272C] transition-colors min-h-[40px] ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <ArrowUpRight className="w-4 h-4 text-[#B69A69]" />
              {!collapsed && <span>View Public Site</span>}
            </div>
          </Link>

          <button
            onClick={logout}
            title={collapsed ? 'Sign Out' : undefined}
            className={`flex items-center rounded-lg px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full min-h-[40px] cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start space-x-2.5'
            }`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Desktop Collapse toggle button */}
        <div className="hidden md:block pt-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1.5 text-xs text-[#BFC3C8]/70 hover:text-[#F5F5F2] hover:bg-[#23272C] rounded-lg transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`fixed top-0 bottom-0 left-0 z-40 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;

