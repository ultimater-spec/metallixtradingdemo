import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldAlert, Sparkles, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Product, QuoteFormData } from '../../types';
import Button from '../common/Button';
import { useWebsiteData } from '../../context/WebsiteDataContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { addEnquiry } = useWebsiteData();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    productName: '',
    productId: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        productName: product.name,
        productId: product.id,
        message: `Hello Metallix Trading, please provide a commercial quotation for ${product.name} (Ref: ${product.id}). We require estimated lead time and availability for our project.`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productName: '',
        productId: '',
        message: '',
      }));
    }
    setErrors({});
    setSubmitted(false);
  }, [product, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide enquiry details or quantities';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addEnquiry({
        customerName: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        productName: formData.productName,
        productId: formData.productId,
        quantity: 'Quote Request via Product Modal',
        message: formData.message,
      });
      setSubmitted(true);
    }
  };

  const MotionDiv: React.ElementType = motion.div;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1012]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-[#17191C] border border-[#BFC3C8]/20 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#BFC3C8]/10 bg-[#23272C]/40 shrink-0">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#B69A69]/15 border border-[#B69A69]/30 flex items-center justify-center text-[#B69A69] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F2] truncate">
                    Request a Quotation
                  </h3>
                  <p className="text-xs text-[#BFC3C8] truncate">
                    Commercial quotation request for UAE & regional projects
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-[#BFC3C8] hover:text-[#F5F5F2] hover:bg-[#23272C] transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="text-xl font-bold font-heading text-[#F5F5F2]">
                    Enquiry Validated Successfully
                  </h4>

                  <div className="p-4 rounded-xl bg-[#23272C]/60 border border-[#BFC3C8]/10 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div>
                      <span className="text-[#BFC3C8]">Selected Product: </span>
                      <strong className="text-[#F5F5F2]">{formData.productName}</strong>
                    </div>
                    {formData.productId && (
                      <div>
                        <span className="text-[#BFC3C8]">Item Reference: </span>
                        <span className="font-mono text-[#B69A69]">{formData.productId}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[#BFC3C8]">Contact Person: </span>
                      <span className="text-[#F5F5F2]">{formData.name} ({formData.company})</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#B69A69]/10 border border-[#B69A69]/25 flex items-start space-x-2.5 text-left text-xs text-[#BFC3C8]">
                    <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demonstration Notice:</strong> Frontend validation succeeded. In a production environment with an active backend, this quotation request will be directly dispatched to the Metallix sales desk.
                    </span>
                  </div>

                  <div className="pt-2 flex justify-center space-x-3">
                    <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                      Submit Another
                    </Button>
                    <Button variant="primary" size="sm" onClick={onClose}>
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Selected Product Banner */}
                  {formData.productName && (
                    <div className="p-3.5 rounded-xl bg-[#23272C]/70 border border-[#B69A69]/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B69A69] font-bold">
                          Selected Item
                        </span>
                        <div className="text-sm font-bold text-[#F5F5F2] line-clamp-1">
                          {formData.productName}
                        </div>
                      </div>
                      {formData.productId && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#17191C] text-[#BFC3C8] border border-[#BFC3C8]/15">
                          {formData.productId}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#BFC3C8] flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Smith"
                        className={`w-full px-3 py-2 bg-[#23272C] border rounded-lg text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#BFC3C8]/20 focus:border-[#B69A69]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#BFC3C8] flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>Company / Organization *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Al Futtaim Construction"
                        className={`w-full px-3 py-2 bg-[#23272C] border rounded-lg text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:outline-none transition-colors ${
                          errors.company
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#BFC3C8]/20 focus:border-[#B69A69]'
                        }`}
                      />
                      {errors.company && <p className="text-[11px] text-red-400">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#BFC3C8] flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>Business Email *</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-3 py-2 bg-[#23272C] border rounded-lg text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#BFC3C8]/20 focus:border-[#B69A69]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#BFC3C8] flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>Contact Number *</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className={`w-full px-3 py-2 bg-[#23272C] border rounded-lg text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#BFC3C8]/20 focus:border-[#B69A69]'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message / Quantity */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#BFC3C8] flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#B69A69]" />
                      <span>Enquiry Specifications & Quantity Details *</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify required quantities, project delivery timeline, and dimensions..."
                      className={`w-full px-3 py-2 bg-[#23272C] border rounded-lg text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#BFC3C8]/20 focus:border-[#B69A69]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
                  </div>

                  <div className="pt-2 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 xs:space-x-3 [&>*]:w-full xs:[&>*]:w-auto [&>*]:justify-center">
                    <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit" icon={<Send className="w-4 h-4" />}>
                      Submit Quote Request
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
