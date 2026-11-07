import React from 'react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const AboutSection: React.FC = () => {
  const { homepageSettings } = useWebsiteData();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#17191C] border-b border-[#BFC3C8]/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <SectionHeading
              badge={homepageSettings.aboutBadge || 'About Metallix Trading'}
              title={homepageSettings.aboutHeading || 'Building Trust Through Quality'}
              subtitle={homepageSettings.aboutDescription || 'Metallix Trading supplies quality architectural hardware, furniture fittings, building materials, glass hardware, and industrial tools to contractors, joinery manufacturers, and developers across the UAE.'}
            />

            <div className="space-y-3 pt-2">
              {[
                'Comprehensive selection of architectural hardware & locksets',
                'Precision furniture fittings, drawer runners & cabinetry components',
                'High-performance structural sealants, adhesives & expansion anchors',
                'Reliable B2B trade supply with prompt enquiry turnaround',
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3 text-xs sm:text-sm text-[#BFC3C8]">
                  <CheckCircle2 className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4">
              <Button to="/about" variant="secondary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
                Learn More About Us
              </Button>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/10 flex flex-col justify-center items-center text-center space-y-3 sm:space-y-4">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#B69A69] tracking-wider uppercase">
              UAE Trade Supply
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#F5F5F2] uppercase tracking-wider">
              Architectural & Building Hardware
            </div>
            <p className="text-xs text-[#BFC3C8] max-w-sm leading-relaxed">
              Serving commercial developers, joinery workshops, interior fit-out contractors, and metal fabricators with dependable product sourcing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
