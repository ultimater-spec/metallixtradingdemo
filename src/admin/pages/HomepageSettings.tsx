import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Save,
  Check,
  RotateCcw,
  ExternalLink,
  Home,
  Image as ImageIcon,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { HomepageSettings as IHomepageSettings } from '../../types';
import { defaultHomepageSettings } from '../../data/defaults';

const HERO_BG_PRESETS = [
  { label: 'Modern Architectural Subframe', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80' },
  { label: 'High-Rise Steel & Glass Facade', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80' },
  { label: 'Architectural Geometric Atrium', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80' },
  { label: 'Polished Stainless Hardware Space', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1920&q=80' },
];

export const HomepageSettings: React.FC = () => {
  const { homepageSettings, updateHomepageSettings } = useWebsiteData();
  const [formData, setFormData] = useState<IHomepageSettings>({ ...homepageSettings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset homepage content fields back to standard Metallix defaults?')) {
      setFormData(defaultHomepageSettings);
      updateHomepageSettings(defaultHomepageSettings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  return (
    <AdminLayout
      title="Homepage Content Management"
      subtitle="Edit hero banner text, background imagery, about section messaging, and quotation call-to-actions in real time."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Status & Save Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-[#B69A69] shrink-0" />
            <div>
              <h2 className="text-sm font-bold font-heading text-slate-900">
                Front-Facing Homepage Configuration
              </h2>
              <p className="text-xs text-slate-500">
                Changes saved here instantly update the public landing page.
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

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-1 px-3 py-2 min-h-[44px] rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 xs:flex-initial"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>View Public</span>
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-1.5 px-5 py-2 min-h-[44px] rounded-xl text-xs font-bold bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] shadow-xs transition-colors cursor-pointer w-full xs:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center space-x-2 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Homepage settings successfully published! Public website has been updated.</span>
            </div>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-emerald-900 shrink-0"
            >
              Inspect Live →
            </Link>
          </div>
        )}

        {/* Section 1: Hero Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold text-[#B69A69] uppercase tracking-wider">
              Primary Hero Section
            </span>
            <h3 className="text-base font-bold font-heading text-slate-900">
              Hero Banner Copy & Visual Assets
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Hero Trust Badge</label>
              <input
                type="text"
                value={formData.heroBadge}
                onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                placeholder="UAE Market Focus • Architectural Hardware Specialist"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Main Heading (Hero Title) *</label>
              <input
                type="text"
                required
                value={formData.heroHeading}
                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                placeholder="ENGINEERING EXCELLENCE. BUILDING TRUST."
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Hero Description Paragraph *</label>
              <textarea
                rows={3}
                required
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                placeholder="Discover quality architectural hardware, building materials and industrial solutions..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            {/* Background Image & Presets */}
            <div className="space-y-2 sm:col-span-2">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                <label className="text-xs font-semibold text-slate-700">Hero Background Image URL *</label>
                <span className="text-[10px] text-slate-400">Select preset or enter custom image URL:</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <ImageIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={formData.heroBgImage}
                    onChange={(e) => setFormData({ ...formData, heroBgImage: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                  />
                </div>
                <img
                  src={formData.heroBgImage}
                  alt="Hero Preview"
                  className="w-16 h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {HERO_BG_PRESETS.map((p, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setFormData({ ...formData, heroBgImage: p.url })}
                    className={`text-[11px] px-3 py-1.5 min-h-[36px] rounded-lg border transition-colors ${
                      formData.heroBgImage === p.url
                        ? 'bg-[#B69A69] text-white border-[#B69A69]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Primary Button Label</label>
              <input
                type="text"
                required
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                placeholder="Explore Products"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Secondary Button Label</label>
              <input
                type="text"
                required
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                placeholder="Request a Quote"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: About Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold text-[#B69A69] uppercase tracking-wider">
              Homepage Teaser
            </span>
            <h3 className="text-base font-bold font-heading text-slate-900">
              About Metallix Section Copy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">About Section Heading *</label>
              <input
                type="text"
                required
                value={formData.aboutHeading}
                onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
                placeholder="Building Trust Through Quality"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">About Description Paragraph *</label>
              <textarea
                rows={3}
                required
                value={formData.aboutDescription}
                onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                placeholder="Metallix Trading supplies quality architectural hardware..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact CTA */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold text-[#B69A69] uppercase tracking-wider">
              Call to Action Strip
            </span>
            <h3 className="text-base font-bold font-heading text-slate-900">
              Quotation Request (RFQ) CTA Strip
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Contact CTA Heading *</label>
              <input
                type="text"
                required
                value={formData.contactCtaHeading}
                onChange={(e) => setFormData({ ...formData, contactCtaHeading: e.target.value })}
                placeholder="Need a Commercial Quotation or Material Specification?"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs font-bold text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Contact CTA Description *</label>
              <textarea
                rows={2}
                required
                value={formData.contactCtaDescription}
                onChange={(e) => setFormData({ ...formData, contactCtaDescription: e.target.value })}
                placeholder="Submit your project schedule, bill of materials, or custom hardware requirements..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default HomepageSettings;
