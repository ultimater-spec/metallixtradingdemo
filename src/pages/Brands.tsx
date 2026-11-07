import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import { useWebsiteData } from '../context/WebsiteDataContext';
import {
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Building2,
  Tag,
  Search,
} from 'lucide-react';

export const Brands: React.FC = () => {
  const { publishedBrands, publishedCategories } = useWebsiteData();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const MotionDiv: React.ElementType = motion.div;

  // Find category slug for links
  const getCategorySlug = (catName: string) => {
    const found = publishedCategories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return found ? found.slug : '';
  };

  const filteredBrands = publishedBrands.filter((brand) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      brand.categories.some((c) => c.toLowerCase() === selectedFilter.toLowerCase());
    const matchesSearch =
      !searchQuery.trim() ||
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <PageLayout
      title="Our Brands | Partner Manufacturers | Metallix Trading"
      description="Explore brand manufacturer profiles and product lines distributed by Metallix Trading in the UAE."
    >
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#0F1012] via-[#17191C] to-[#17191C] border-b border-[#BFC3C8]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container className="relative z-10 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#BFC3C8]">
            <Link to="/" className="hover:text-[#B69A69] transition-colors py-0.5">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <span className="text-[#B69A69] font-medium py-0.5">Brands</span>
          </nav>

          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B69A69]/15 border border-[#B69A69]/30 text-[11px] sm:text-xs text-[#B69A69] font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Partner Manufacturers & Product Lines</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
              Our Brands
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#BFC3C8] leading-relaxed">
              Metallix Trading collaborates with leading regional and international manufacturers to provide quality architectural hardware, precision furniture fittings, and specialized construction materials.
            </p>
          </div>

          {/* Important Demonstration Notice Banner */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#23272C]/70 border border-[#BFC3C8]/15 flex items-start space-x-2.5 sm:space-x-3 text-xs text-[#BFC3C8] max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> Brand profiles below represent illustrative demonstration placeholders for this website prototype. They do not constitute official manufacturer affiliations or exclusive agency relationships.
            </span>
          </div>
        </Container>
      </section>

      {/* Main Brands Section */}
      <section className="py-8 sm:py-12 bg-[#17191C]">
        <Container className="space-y-6 sm:space-y-8">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/15 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BFC3C8]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand profiles by name or category..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#17191C] border border-[#BFC3C8]/20 rounded-xl text-xs sm:text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/50 focus:outline-none focus:border-[#B69A69] min-h-[44px]"
              />
            </div>

            {/* Quick Filter Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#BFC3C8] shrink-0">Filter Category:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-[#17191C] border border-[#BFC3C8]/20 rounded-xl text-xs text-[#F5F5F2] focus:outline-none focus:border-[#B69A69] cursor-pointer min-h-[44px]"
              >
                <option value="all">All Brand Lines ({publishedBrands.length})</option>
                {publishedCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Logo Emblem Showcase Ribbon */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B69A69] font-heading">
              Brand Directory Overview
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-3">
              {publishedBrands.map((b) => (
                <div
                  key={b.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#23272C]/30 border border-[#BFC3C8]/10 flex flex-col items-center justify-center text-center space-y-1 hover:border-[#B69A69]/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#17191C] border border-[#BFC3C8]/15 flex items-center justify-center text-xs font-bold font-heading text-[#B69A69]">
                    {b.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#F5F5F2] line-clamp-1">
                    {b.name}
                  </span>
                  <span className="text-[9px] text-[#BFC3C8]/60 font-mono">
                    DEMO
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Detail Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
            {filteredBrands.map((brand, idx) => (
              <MotionDiv
                key={brand.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/15 hover:border-[#B69A69]/50 transition-all duration-300 flex flex-col justify-between space-y-5 group hover:shadow-xl hover:shadow-[#B69A69]/5"
              >
                <div className="space-y-4">
                  {/* Card Header with Emblem and Placeholder badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-[#17191C] border border-[#BFC3C8]/20 flex items-center justify-center text-lg font-bold font-heading text-[#B69A69] group-hover:scale-105 transition-transform">
                        {brand.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-heading text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors">
                          {brand.name}
                        </h3>
                        <div className="text-[11px] text-[#BFC3C8]/70 flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-[#B69A69]" />
                          <span>{brand.origin || 'Trading Line'}</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#17191C] text-[#BFC3C8]/70 border border-[#BFC3C8]/15">
                      Demo
                    </span>
                  </div>

                  {/* Tagline */}
                  {brand.tagline && (
                    <div className="text-xs font-semibold text-[#B69A69]">
                      {brand.tagline}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#BFC3C8] leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Associated Categories */}
                  <div className="space-y-1.5 pt-2 border-t border-[#BFC3C8]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BFC3C8]/60">
                      Product Categories
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.categories.map((catName) => {
                        const slug = getCategorySlug(catName);
                        return (
                          <Link
                            key={catName}
                            to={slug ? `/products?category=${slug}` : '/products'}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] bg-[#17191C] hover:bg-[#B69A69]/20 text-[#BFC3C8] hover:text-[#B69A69] border border-[#BFC3C8]/15 hover:border-[#B69A69]/30 transition-colors"
                          >
                            <Tag className="w-3 h-3 text-[#B69A69]" />
                            <span>{catName}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-[#BFC3C8]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#BFC3C8]/60">
                    Sourced for UAE projects
                  </span>
                  <Link
                    to="/products"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[#B69A69] hover:underline"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </MotionDiv>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-[#23272C]/30 border border-[#BFC3C8]/15 space-y-3">
              <p className="text-base font-semibold text-[#F5F5F2]">No brand profiles match your search criteria.</p>
              <Button size="sm" variant="primary" onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          )}

          {/* Bottom Inquiries CTA */}
          <div className="p-8 rounded-2xl bg-[#0F1012] border border-[#BFC3C8]/15 text-center space-y-4">
            <h3 className="text-xl font-bold font-heading text-[#F5F5F2]">
              Looking for a Specific Brand or Specification?
            </h3>
            <p className="text-xs sm:text-sm text-[#BFC3C8] max-w-xl mx-auto">
              Our trading desk coordinates with diverse international suppliers. Contact us with your required brand specification or bill of quantities.
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Submit Brand RFQ
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default Brands;
