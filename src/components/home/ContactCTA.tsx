import React from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import { ArrowRight, PhoneCall, Mail } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const ContactCTA: React.FC = () => {
  const { homepageSettings, companySettings } = useWebsiteData();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#17191C] via-[#23272C] to-[#17191C] relative border-b border-[#BFC3C8]/10 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#B69A69]/10 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-[#B69A69]/20 text-[#B69A69] border border-[#B69A69]/30">
            {homepageSettings.contactCtaBadge || 'Fast Response RFQ Desk'}
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
            {homepageSettings.contactCtaHeading || 'Need a Commercial Quotation or Material Specification?'}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#BFC3C8] max-w-2xl mx-auto leading-relaxed">
            {homepageSettings.contactCtaDescription || 'Submit your project schedule, bill of materials, or custom hardware requirements. Our trade desk provides prompt commercial pricing and availability.'}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 [&>*]:w-full sm:[&>*]:w-auto [&>*]:justify-center">
            <Button to="/contact" size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Submit RFQ Online
            </Button>
            <a
              href={`tel:${companySettings.phone}`}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-[#17191C] border border-[#BFC3C8]/20 text-sm font-semibold text-[#F5F5F2] hover:border-[#B69A69] transition-colors min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-[#B69A69]" />
              <span>Call Direct: {companySettings.phone}</span>
            </a>
          </div>

          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-[#BFC3C8]/70">
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>{companySettings.salesEmail}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Fast Turnaround Guarantee</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactCTA;
