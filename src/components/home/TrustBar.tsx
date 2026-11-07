import React from 'react';
import Container from '../common/Container';
import { Award, Globe2, ShieldCheck, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustMetrics = [
    { icon: ShieldCheck, title: 'Certified Quality', subtitle: 'Architectural Standards' },
    { icon: Award, title: 'Verified Brands', subtitle: 'Authentic Hardware' },
    { icon: Globe2, title: 'UAE Market Focus', subtitle: 'Local Stock & Supply' },
    { icon: Truck, title: 'Rapid Delivery', subtitle: 'Regional Trade Hubs' },
  ];

  return (
    <section className="bg-[#0F1012] border-b border-[#BFC3C8]/10 py-5 sm:py-6">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trustMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-2.5 sm:space-x-3.5 p-2 sm:p-0 rounded-lg bg-[#17191C]/50 sm:bg-transparent border border-[#BFC3C8]/5 sm:border-none">
                <div className="p-2 sm:p-2.5 rounded-lg bg-[#17191C] border border-[#BFC3C8]/10 text-[#B69A69] shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-[#F5F5F2] font-heading truncate">{item.title}</div>
                  <div className="text-[11px] sm:text-xs text-[#BFC3C8]/70 truncate">{item.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TrustBar;

