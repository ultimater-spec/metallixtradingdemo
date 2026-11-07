import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Save,
  Check,
  RotateCcw,
  Building,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Globe,
  Share2,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { CompanySettings as ICompanySettings } from '../../types';
import { defaultCompanySettings } from '../../data/defaults';

export const CompanySettings: React.FC = () => {
  const { companySettings, updateCompanySettings } = useWebsiteData();
  const [formData, setFormData] = useState<ICompanySettings>({ ...companySettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset company contact information to standard demo placeholders?')) {
      setFormData(defaultCompanySettings);
      updateCompanySettings(defaultCompanySettings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  return (
    <AdminLayout
      title="Company & Corporate Contact Settings"
      subtitle="Configure trade contact information, showroom address, RFQ desk emails, and social profiles displayed across the website."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Action Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-[#B69A69] shrink-0" />
            <div>
              <h2 className="text-sm font-bold font-heading text-slate-900">
                Corporate Entity & Trade Desk Profile
              </h2>
              <p className="text-xs text-slate-500">
                Updates here immediately reflect across the public Navbar, Footer, and Contact page.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center justify-center space-x-1 px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 xs:flex-initial cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-1.5 px-5 py-2 min-h-[44px] rounded-xl text-xs font-bold bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] shadow-xs transition-colors cursor-pointer w-full xs:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center space-x-2 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Company settings saved! Contact page and footer now reflect updated information.</span>
            </div>
            <Link
              to="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-emerald-900 shrink-0"
            >
              Inspect Contact Page →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* General Information */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Building className="w-4 h-4 text-[#B69A69]" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Entity Profile & Timing
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Company Legal Name</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Metallix Trading LLC"
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Official Website URL</label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://metallixtrading.com"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Operating & Trading Hours</label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                    placeholder="Mon - Fri: 08:00 - 18:00 (GST)"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Showroom / Warehouse Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Industrial Area, Dubai, United Arab Emirates (Showroom & Warehouse)"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details & Communications */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#B69A69]" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Direct Communication Channels
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">General Enquiries Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@metallixtrading.com"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Sales & RFQ Dedicated Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.salesEmail}
                    onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                    placeholder="sales@metallixtrading.com"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Telephone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 4 000 0000"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">WhatsApp Commercial Hotline</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.whatsApp}
                    onChange={(e) => setFormData({ ...formData, whatsApp: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 lg:col-span-2">
            <div className="border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-[#B69A69]" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Social Profiles & Networks
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/metallix-trading"
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Facebook Page</label>
                <input
                  type="url"
                  value={formData.facebook || ''}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="https://facebook.com/metallixtrading"
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Instagram Handle</label>
                <input
                  type="url"
                  value={formData.instagram || ''}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/metallixtrading"
                  className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CompanySettings;

