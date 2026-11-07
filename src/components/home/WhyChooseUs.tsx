import React from 'react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ShieldCheck, Truck, Clock, Layers } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Authentic Hardware & Warranties',
      desc: 'Direct partnerships with verified architectural manufacturers, ensuring genuine materials, warranty coverage, and grade compliance.',
    },
    {
      icon: Layers,
      title: 'Diverse Trade Inventory',
      desc: 'Over 10 comprehensive product categories spanning door controls, furniture fittings, structural fixings, tools, and cladding sheets.',
    },
    {
      icon: Truck,
      title: 'Rapid UAE Distribution',
      desc: 'Centralized inventory coordination servicing contractors across Dubai, Abu Dhabi, Sharjah, and Northern Emirates.',
    },
    {
      icon: Clock,
      title: 'Fast B2B Turnaround',
      desc: 'Dedicated commercial trade desk providing timely quotations on tender schedules, bills of quantities, and custom hardware specifications.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1012] border-b border-[#BFC3C8]/10">
      <Container>
        <SectionHeading
          badge="Why Metallix"
          title="The Preferred Building Materials Partner"
          subtitle="Combining high inventory availability, verified hardware brands, and dedicated trade support for UAE contractors and builders."
          align="center"
          className="mb-8 sm:mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-xl bg-[#17191C] border border-[#BFC3C8]/10 space-y-3 sm:space-y-4 hover:border-[#B69A69]/30 transition-colors"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#23272C] flex items-center justify-center text-[#B69A69]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-[#F5F5F2]">
                  {reason.title}
                </h3>
                <p className="text-xs text-[#BFC3C8] leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;

