import React from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import { Shield, ArrowRight, FileText } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const Hero: React.FC = () => {
  const { homepageSettings } = useWebsiteData();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F1012] via-[#17191C] to-[#17191C] py-14 sm:py-20 lg:py-28 border-b border-[#BFC3C8]/10">
      {/* Background image overlay */}
      {homepageSettings.heroBgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${homepageSettings.heroBgImage})` }}
        />
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B69A69]/10 border border-[#B69A69]/30 text-[11px] sm:text-xs text-[#B69A69] font-medium max-w-full">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{homepageSettings.heroBadge || 'UAE Market Focus • Architectural Hardware & Building Materials'}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#F5F5F2] tracking-tight leading-tight uppercase break-words">
            {homepageSettings.heroHeading || 'ENGINEERING EXCELLENCE. BUILDING TRUST.'}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#BFC3C8] max-w-2xl leading-relaxed">
            {homepageSettings.heroDescription || 'Discover quality architectural hardware, building materials and industrial solutions from Metallix Trading across the UAE.'}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 [&>*]:w-full sm:[&>*]:w-auto [&>*]:justify-center">
            <Button to="/products" size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              {homepageSettings.primaryButtonText || 'Explore Products'}
            </Button>
            <Button to="/contact" size="lg" variant="secondary" icon={<FileText className="w-4 h-4" />}>
              {homepageSettings.secondaryButtonText || 'Request a Quote'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
