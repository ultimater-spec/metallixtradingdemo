import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { useWebsiteData } from '../../context/WebsiteDataContext';

export const FeaturedProducts: React.FC = () => {
  const { publishedProducts } = useWebsiteData();
  const featured = publishedProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#17191C] border-b border-[#BFC3C8]/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <SectionHeading
            badge="Featured Products"
            title="Engineered for Precision & Longevity"
            subtitle="Explore sample building materials, architectural hardware, and specialized fittings from our catalogue."
          />
          <Button to="/products" variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-[#23272C]/50 border border-[#BFC3C8]/10 hover:border-[#B69A69]/40 transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4 group hover:shadow-xl hover:shadow-[#B69A69]/5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#B69A69] font-semibold">{product.categoryName}</span>
                  <span className="text-amber-300 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#B69A69]" />
                    <span>{product.availability}</span>
                  </span>
                </div>

                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#17191C]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#BFC3C8]/60">Ref: {product.id}</span>
                  <h3 className="text-sm font-bold text-[#F5F5F2] font-heading line-clamp-2 group-hover:text-[#B69A69] transition-colors">
                    {product.name}
                  </h3>
                </div>

                <p className="text-xs text-[#BFC3C8] line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-[#BFC3C8]/10 flex items-center justify-between gap-2">
                <Link
                  to={`/products/${product.id}`}
                  className="text-xs font-semibold text-[#B69A69] hover:underline min-h-[40px] flex items-center py-2"
                >
                  View Details →
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg bg-[#17191C] border border-[#BFC3C8]/20 text-xs text-[#F5F5F2] hover:border-[#B69A69] min-h-[40px]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>Enquire</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
