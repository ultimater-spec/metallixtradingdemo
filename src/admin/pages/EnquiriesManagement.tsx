import React, { useState } from 'react';
import {
  Search,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Trash2,
  Eye,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Enquiry, EnquiryStatus } from '../../types';

export const EnquiriesManagement: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useWebsiteData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Enquiry | null>(null);

  const statuses: { label: string; value: string; color: string }[] = [
    { label: 'All', value: 'all', color: 'bg-slate-100 text-slate-700' },
    { label: 'New', value: 'New', color: 'bg-amber-50 text-amber-800' },
    { label: 'Contacted', value: 'Contacted', color: 'bg-blue-50 text-blue-800' },
    { label: 'In Progress', value: 'In Progress', color: 'bg-purple-50 text-purple-800' },
    { label: 'Completed', value: 'Completed', color: 'bg-emerald-50 text-emerald-800' },
  ];

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ? true : e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>New</span>
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>Contacted</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
            <TrendingUp className="w-3 h-3 text-purple-600" />
            <span>In Progress</span>
          </span>
        );
      case 'Completed':
      case 'Quoted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
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
      title="Trade Enquiries & Quotation Desk"
      subtitle="Review quotation requests submitted through the public website, assign statuses, and monitor commercial progress."
    >
      {/* Top Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((st) => {
            const count =
              st.value === 'all'
                ? enquiries.length
                : enquiries.filter((e) => e.status === st.value).length;
            const active = statusFilter === st.value;

            return (
              <button
                key={st.value}
                onClick={() => setStatusFilter(st.value)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#17191C] text-[#F5F5F2] shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    active ? 'bg-[#B69A69] text-[#17191C]' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, company, email, or product..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B69A69] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Enquiries Presentation: Mobile Card View & Desktop Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Mobile Card-Based Layout (< 768px) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredEnquiries.length === 0 ? (
            <div className="py-12 px-4 text-center text-xs text-slate-400">
              No customer enquiries found matching your filter criteria.
            </div>
          ) : (
            filteredEnquiries.map((enq) => (
              <div key={enq.id} className="p-4 space-y-3 hover:bg-slate-50/70 transition-colors">
                {/* Header: Ref & Date & Customer */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug truncate">
                      {enq.customerName}
                    </h4>
                    <div className="text-xs text-slate-500 flex items-center space-x-1 truncate">
                      <Building className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{enq.company}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] font-bold text-[#B69A69] bg-[#17191C] px-2 py-0.5 rounded">
                      {enq.id}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">{enq.date}</div>
                  </div>
                </div>

                {/* Requested Item */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                  <div className="font-semibold text-slate-800 line-clamp-1">
                    {enq.productName}
                  </div>
                  <div className="text-[11px] text-[#B69A69] font-semibold">
                    Qty: {enq.quantity || 'Quote Requested'}
                  </div>
                  {enq.message && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 pt-0.5">
                      &ldquo;{enq.message}&rdquo;
                    </p>
                  )}
                </div>

                {/* Contact Quick Links */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href={`mailto:${enq.email}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium min-h-[40px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B69A69]" />
                    <span className="truncate max-w-[150px]">{enq.email}</span>
                  </a>
                  <a
                    href={`tel:${enq.phone}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium min-h-[40px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
                    <span>{enq.phone}</span>
                  </a>
                </div>

                {/* Status & Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-400">Status:</span>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                      }
                      className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#B69A69] min-h-[44px] cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(enq)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 cursor-pointer"
                      title="Inspect enquiry"
                      aria-label="Inspect enquiry"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteCandidate(enq)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer"
                      title="Delete enquiry"
                      aria-label="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Data Table Layout (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref & Date</th>
                <th className="py-3.5 px-4">Customer & Contractor</th>
                <th className="py-3.5 px-4">Requested Item</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No enquiries found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Ref & Date */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{enq.id}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{enq.date}</div>
                    </td>

                    {/* Customer & Company */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{enq.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>{enq.company}</span>
                      </div>
                    </td>

                    {/* Product & Qty */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-medium text-slate-800 line-clamp-1">
                        {enq.productName}
                      </div>
                      <div className="text-[11px] text-[#B69A69] font-semibold mt-0.5">
                        Qty: {enq.quantity || 'Quote Requested'}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <a
                          href={`mailto:${enq.email}`}
                          className="text-[11px] text-slate-600 hover:text-[#B69A69] flex items-center space-x-1"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{enq.email}</span>
                        </a>
                        <a
                          href={`tel:${enq.phone}`}
                          className="text-[11px] text-slate-600 hover:text-[#B69A69] flex items-center space-x-1"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{enq.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Status dropdown */}
                    <td className="py-3 px-4 text-center">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                        }
                        className="text-[11px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#B69A69] cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="View enquiry details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteCandidate(enq)}
                          className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Details Modal */}
      <Modal
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title={selectedEnquiry ? `Enquiry ${selectedEnquiry.id}` : 'Enquiry Detail'}
        subtitle="Commercial RFQ overview and customer specification message."
        maxWidth="lg"
      >
        {selectedEnquiry && (
          <div className="space-y-5">
            {/* Status & Date */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">Current Status:</span>
                {getStatusBadge(selectedEnquiry.status)}
              </div>
              <div className="text-xs text-slate-500 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedEnquiry.date}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Customer & Organization
                </span>
                <div className="font-bold text-sm text-slate-900">
                  {selectedEnquiry.customerName}
                </div>
                <div className="text-slate-600">{selectedEnquiry.company}</div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Contact Information
                </span>
                <div className="text-slate-700">Email: {selectedEnquiry.email}</div>
                <div className="text-slate-700">Phone: {selectedEnquiry.phone}</div>
              </div>
            </div>

            {/* Requested Product */}
            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Requested Hardware Item
              </span>
              <div className="font-bold text-slate-900">
                {selectedEnquiry.productName}
              </div>
              <div className="text-slate-600 font-semibold text-[#B69A69]">
                Estimated Quantity: {selectedEnquiry.quantity || 'Quote Requested'}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Customer Message & Specifications
              </span>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message || 'No additional project specifications provided.'}
              </div>
            </div>

            {/* Change Status Controls */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Update RFQ Status:</span>
              <div className="flex items-center space-x-2">
                {(['New', 'Contacted', 'In Progress', 'Completed'] as EnquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      updateEnquiryStatus(selectedEnquiry.id, st);
                      setSelectedEnquiry({ ...selectedEnquiry, status: st });
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-[#B69A69] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={() => {
          if (deleteCandidate) {
            deleteEnquiry(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
        title="Delete Enquiry Record?"
        message={`Are you sure you want to permanently delete enquiry ${deleteCandidate?.id} from ${deleteCandidate?.customerName}?`}
        confirmLabel="Confirm Delete"
      />
    </AdminLayout>
  );
};

export default EnquiriesManagement;
