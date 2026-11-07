import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();

  const [email, setEmail] = useState('admin@metallixtrading.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid administrator credentials.');
      }
    } catch {
      setError('An unexpected error occurred during demo sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@metallixtrading.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0F1012] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <Helmet>
        <title>Admin Portal Login | Metallix Trading</title>
      </Helmet>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B69A69] via-[#8E949C] to-[#17191C] p-[1.5px] shadow-lg shadow-[#B69A69]/15">
              <div className="w-full h-full bg-[#17191C] rounded-[9px] flex items-center justify-center">
                <span className="font-heading font-black text-2xl text-[#B69A69]">M</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-black text-xl tracking-wider text-[#F5F5F2] leading-none">
                METALLIX
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A69] font-bold mt-1">
                ADMINISTRATION CMS
              </span>
            </div>
          </Link>
          <h2 className="text-xl font-bold font-heading text-[#F5F5F2]">
            Staff & Content Management Portal
          </h2>
          <p className="text-xs text-[#BFC3C8] max-w-sm mx-auto">
            Authorized sign in to manage products, categories, enquiries, and public website content.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-4 rounded-xl bg-[#17191C] border border-[#B69A69]/30 text-xs text-[#BFC3C8] space-y-2 shadow-xl">
          <div className="flex items-center space-x-2 text-[#B69A69] font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Interactive Frontend Demo Authentication</span>
          </div>
          <p className="text-[11px] text-[#BFC3C8]/80 leading-relaxed">
            This demo uses simulated local session persistence. Real production deployments must enforce JWT token verification and salted password hashing through backend Express APIs.
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Default Demo Credentials:</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#B69A69] font-semibold underline hover:text-[#d3b47f] cursor-pointer"
            >
              Autofill Demo Login
            </button>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="mt-6 bg-[#17191C] py-6 px-4 sm:py-8 sm:px-8 rounded-2xl border border-[#BFC3C8]/15 shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#BFC3C8] block">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BFC3C8]/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@metallixtrading.com"
                  className="w-full pl-9 pr-3.5 py-3 min-h-[44px] bg-[#23272C] border border-[#BFC3C8]/20 rounded-xl text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#BFC3C8] block">
                  Password
                </label>
                <span className="text-[10px] text-slate-500">Demo: admin123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#BFC3C8]/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-12 py-3 min-h-[44px] bg-[#23272C] border border-[#BFC3C8]/20 rounded-xl text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-10 h-10 min-h-[40px] min-w-[40px] flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 text-[#BFC3C8]/60 hover:text-[#F5F5F2] focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#B69A69] hover:bg-[#a68c5b] text-[#17191C] font-heading font-bold text-sm tracking-wide shadow-lg shadow-[#B69A69]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#BFC3C8]/10 text-center">
            <Link
              to="/"
              className="text-xs text-[#BFC3C8] hover:text-[#B69A69] transition-colors inline-flex items-center space-x-1 min-h-[44px] py-2 px-3"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

