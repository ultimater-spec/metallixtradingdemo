import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  Shield,
  Inbox,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText,
  Settings,
  Home,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import StatCard from '../components/StatCard';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const Dashboard: React.FC = () => {
  const { products, categories, brands, enquiries } = useWebsiteData();

  const publishedProductsCount = products.filter((p) => p.isPublished !== false).length;
  const draftProductsCount = products.length - publishedProductsCount;

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const inProgressEnquiriesCount = enquiries.filter((e) => e.status === 'In Progress').length;

  const recentEnquiries = enquiries.slice(0, 5);
  const recentProducts = products.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>New RFQ</span>
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Contacted</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <TrendingUp className="w-3 h-3" />
            <span>In Review</span>
          </span>
        );
      case 'Completed':
      case 'Quoted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout
      title="Commercial Overview & Control Dashboard"
      subtitle="Manage catalogue SKUs, categories, customer RFQs, and real-time public website content."
    >
      {/* Demonstration Data Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 shadow-xs">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-[#B69A69] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Interactive Frontend Demo Environment
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              All modifications you perform in this admin panel immediately update the public website and persist locally in browser storage. Real production data will connect to MongoDB via Express APIs.
            </p>
          </div>
        </div>
        <Link
          to="/products"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#17191C] bg-[#B69A69] hover:bg-[#a38856] px-3.5 py-2 rounded-xl shrink-0 transition-colors shadow-xs"
        >
          <span>Verify Live Catalogue</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          trend={`${publishedProductsCount} Published`}
          subtitle={draftProductsCount > 0 ? `• ${draftProductsCount} Draft` : undefined}
          actionLink="/admin/products"
          actionLabel="Products"
        />

        <StatCard
          title="Product Categories"
          value={categories.length}
          icon={Layers}
          trend="10 Core Categories"
          subtitle="UAE Hardware"
          actionLink="/admin/categories"
          actionLabel="Categories"
        />

        <StatCard
          title="Partner Brands"
          value={brands.length}
          icon={Shield}
          trend="Demo Placeholders"
          subtitle="Sourced Partners"
          actionLink="/admin/brands"
          actionLabel="Brands"
        />

        <StatCard
          title="Customer RFQ Enquiries"
          value={enquiries.length}
          icon={Inbox}
          trend={`${newEnquiriesCount} New`}
          subtitle={inProgressEnquiriesCount > 0 ? `• ${inProgressEnquiriesCount} In Review` : undefined}
          actionLink="/admin/enquiries"
          actionLabel="Enquiries"
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Quick Action Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            to="/admin/products"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Add Product</span>
          </Link>

          <Link
            to="/admin/categories"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Categories</span>
          </Link>

          <Link
            to="/admin/enquiries"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Review RFQs</span>
          </Link>

          <Link
            to="/admin/brands"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Brands</span>
          </Link>

          <Link
            to="/admin/homepage"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Homepage</span>
          </Link>

          <Link
            to="/admin/settings"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 hover:border-[#B69A69] hover:bg-slate-50 text-slate-800 transition-all text-center space-y-1.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-[#B69A69]/20 flex items-center justify-center text-[#B69A69] transition-colors">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Recent Enquiries & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#B69A69]" />
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Recent Trade Enquiries & Quotes
              </h3>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs text-slate-500 hover:text-[#B69A69] font-semibold flex items-center space-x-1"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No customer enquiries found in demo storage.
              </div>
            ) : (
              recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-bold text-slate-900 truncate">{enq.customerName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 truncate">{enq.company}</span>
                    </div>
                    <div className="text-slate-500 truncate">
                      {enq.productName} ({enq.quantity || 'Quote Request'})
                    </div>
                    <div className="text-[10px] text-slate-400">{enq.date}</div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end space-y-1.5">
                    {getStatusBadge(enq.status)}
                    <Link
                      to="/admin/enquiries"
                      className="text-[11px] text-[#B69A69] hover:underline font-semibold"
                    >
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recently Added Products */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-[#B69A69]" />
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Active Catalogue Inventory
              </h3>
            </div>
            <Link
              to="/admin/products"
              className="text-xs text-slate-500 hover:text-[#B69A69] font-semibold flex items-center space-x-1"
            >
              <span>Manage ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <div className="space-y-0.5 truncate">
                    <div className="font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">
                      <span className="text-[#B69A69] font-semibold">{p.categoryName}</span>
                      {p.grade ? ` • ${p.grade}` : ''}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.isPublished !== false
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {p.isPublished !== false ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    to={`/products/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#B69A69] p-1"
                    title="View live product"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

