import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { ArrowUpRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { publishedCategories, publishedProducts } = useWebsiteData();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0F1012] border-b border-[#BFC3C8]/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <SectionHeading
            badge="Product Categories"
            title="Building Materials & Architectural Hardware"
            subtitle="Explore our comprehensive range of commercial door controls, joinery fittings, sealants, fixings, and metal solutions."
          />
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-[#B69A69] hover:text-[#CBB285] inline-flex items-center space-x-1 shrink-0 py-1"
          >
            <span>Browse Full Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {publishedCategories.map((category) => {
            const count = publishedProducts.filter((p) => p.categoryId === category.id).length;
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="p-5 sm:p-6 rounded-xl bg-[#17191C] border border-[#BFC3C8]/10 hover:border-[#B69A69]/50 transition-all group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-[#B69A69]/5"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-[#23272C] text-[#BFC3C8]">
                      {count} Items
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#BFC3C8]/40 group-hover:text-[#B69A69] transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#BFC3C8] line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;

