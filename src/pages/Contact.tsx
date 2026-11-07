import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export const Contact: React.FC = () => {
  const { companySettings, publishedCategories, addEnquiry } = useWebsiteData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: '',
    productName: '',
    quantity: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      customerName: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      productName: formData.productName || (formData.category ? `General ${formData.category} Enquiry` : 'General Hardware RFQ'),
      quantity: formData.quantity || 'Trade Quote',
      message: formData.message,
    });
    setSubmitted(true);
  };

  return (
    <PageLayout
      title="Contact Us & Request a Quote | Metallix Trading"
      description="Connect with Metallix Trading for building materials, architectural hardware, and commercial trade inquiries in the UAE."
    >
      <div className="py-10 sm:py-16 bg-gradient-to-b from-[#0F1012] to-[#17191C] border-b border-[#BFC3C8]/10">
        <Container>
          <SectionHeading
            badge="Direct Inquiries"
            title="Commercial Enquiries & Quotations"
            subtitle="Connect with our sales desk for product availability, bulk trade pricing, and project material requirements across the UAE."
          />
        </Container>
      </div>

      <div className="py-8 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Details Column */}
            <div className="space-y-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/10 space-y-5 sm:space-y-6">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F2]">
                  Corporate Office & Trading Desk
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#BFC3C8]">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#B69A69] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#F5F5F2]">Location</div>
                      <div>{companySettings.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#B69A69] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#F5F5F2]">Inquiries</div>
                      <div className="text-[#BFC3C8]/80">{companySettings.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#B69A69] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#F5F5F2]">Sales & Quotes Email</div>
                      <a href={`mailto:${companySettings.salesEmail}`} className="hover:text-[#B69A69] break-all">
                        {companySettings.salesEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#B69A69] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#F5F5F2]">Trading Hours</div>
                      <div>{companySettings.workingHours}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Form */}
            <div className="lg:col-span-2">
              <div className="p-5 sm:p-8 rounded-2xl bg-[#23272C]/30 border border-[#BFC3C8]/10 space-y-6">
                <div className="border-b border-[#BFC3C8]/10 pb-4">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F2]">
                    Request a Quotation / Product Enquiry
                  </h3>
                  <p className="text-xs text-[#BFC3C8] mt-1">
                    Specify the category, item name or dimensions, and estimated volume for commercial pricing.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 sm:p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-xl font-bold text-emerald-200 font-heading">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-sm text-emerald-300 max-w-md mx-auto">
                      Thank you for your enquiry. The Metallix Trading commercial team will review your specifications and contact you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#B69A69] underline cursor-pointer py-1"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. David Richardson"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Company / Contractor Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Fitout & Interiors"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="david@contractor.com"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Contact Phone / Mobile</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Product Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        >
                          <option value="">Select Category</option>
                          {publishedCategories.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Item Description / Code</label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          placeholder="e.g. Floor Spring or Concealed Hinge"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#BFC3C8]">Est. Quantity / Units</label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="e.g. 50 Sets or 200 Pcs"
                          className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#BFC3C8]">Specifications & Project Details</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail finish requirements (SS304/SS316, Matt Black, Satin Brass), dimensions, site delivery schedule, or attach product references..."
                        className="w-full px-3.5 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-lg text-base sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/40 focus:border-[#B69A69] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />} className="w-full sm:w-auto justify-center min-h-[44px]">
                        Submit Quotation Request
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default Contact;

