import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { Shield, ArrowRight } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const BrandsSection: React.FC = () => {
  const { publishedBrands } = useWebsiteData();
  const displayBrands = publishedBrands.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#17191C] border-b border-[#BFC3C8]/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <SectionHeading
            badge="Partner Network"
            title="Brands & Supply Partners"
            subtitle="Metallix Trading sources through recognized manufacturing partners across architectural hardware, sealants, tools, and metal fittings."
          />
          <div className="w-full sm:w-auto shrink-0">
            <Button
              to="/brands"
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto min-h-[44px] justify-center"
            >
              Explore All Brands
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayBrands.map((brand) => (
            <Link
              key={brand.id}
              to="/brands"
              className="p-3.5 sm:p-5 rounded-xl bg-[#23272C]/40 border border-[#BFC3C8]/10 text-center flex flex-col items-center justify-center space-y-2 hover:border-[#B69A69]/40 hover:bg-[#23272C]/70 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#17191C] border border-[#BFC3C8]/15 flex items-center justify-center group-hover:border-[#B69A69]/50 transition-colors">
                <Shield className="w-5 h-5 text-[#B69A69]" />
              </div>
              <div className="font-heading font-bold text-sm text-[#F5F5F2] line-clamp-1">{brand.name}</div>
              <div className="text-[11px] text-[#BFC3C8]/70 line-clamp-1">{brand.tagline}</div>
              <span className="text-[9px] uppercase tracking-wider text-[#B69A69] bg-[#B69A69]/10 px-2 py-0.5 rounded-full mt-1">
                Demo Brand
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BrandsSection;

