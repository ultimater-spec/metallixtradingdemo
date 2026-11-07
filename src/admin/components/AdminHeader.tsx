import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, RotateCcw, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMobileMenuToggle,
  title,
  subtitle,
}) => {
  const { resetAllDemoData } = useWebsiteData();
  const { currentUser } = useAdminAuth();
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to default initial products, categories, brands, projects, and settings? This will clear custom localStorage changes.')) {
      resetAllDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left title and mobile hamburger */}
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 focus:outline-none shrink-0 cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <h1 className="text-sm sm:text-lg font-bold font-heading text-slate-900 leading-tight truncate">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/70 shrink-0">
              <ShieldCheck className="w-3 h-3 text-[#B69A69]" />
              <span>Demo CMS</span>
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5 truncate max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={handleReset}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            resetSuccess
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
          title="Reset all demo data to default stock data"
        >
          {resetSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Restored Defaults</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset Demo Data</span>
            </>
          )}
        </button>

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#17191C] hover:bg-[#23272C] text-[#F5F5F2] border border-transparent shadow-xs transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#B69A69]" />
        </Link>

        {/* User initials badge */}
        <div className="w-8 h-8 rounded-full bg-[#17191C] border border-[#B69A69]/40 flex items-center justify-center text-xs font-bold text-[#B69A69] shrink-0" title={currentUser?.email}>
          {currentUser?.name?.charAt(0) || 'A'}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

