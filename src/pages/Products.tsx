import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import ProductCard from '../components/products/ProductCard';
import { ProductFilters, CategorySidebar } from '../components/products/ProductFilters';
import QuoteModal from '../components/products/QuoteModal';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Product } from '../types';
import { ChevronRight, ShieldAlert, Sparkles, PackageSearch } from 'lucide-react';
import Button from '../components/common/Button';

export const Products: React.FC = () => {
  const { publishedProducts, publishedCategories } = useWebsiteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // Modal State
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleSelectCategory = (categorySlug: string) => {
    if (categorySlug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categorySlug });
    }
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSortBy('name-asc');
  };

  const handleOpenQuoteModal = (product: Product) => {
    setSelectedProductForQuote(product);
    setIsQuoteModalOpen(true);
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    let result = publishedProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.id.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'category') {
        return a.categoryName.localeCompare(b.categoryName);
      }
      if (sortBy === 'featured') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <PageLayout
      title="Our Products | Architectural Hardware & Building Materials | Metallix Trading"
      description="Explore our range of architectural hardware, building materials and industrial solutions from Metallix Trading."
    >
      {/* Breadcrumb & Header Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#0F1012] via-[#17191C] to-[#17191C] border-b border-[#BFC3C8]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B69A69_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container className="relative z-10 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#BFC3C8]">
            <Link to="/" className="hover:text-[#B69A69] transition-colors py-1">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <span className="text-[#B69A69] font-medium py-1">Products</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
                <span className="text-[#F5F5F2] py-1">
                  {publishedCategories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </nav>

          {/* Page Titles */}
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#B69A69]/10 border border-[#B69A69]/30 text-[11px] sm:text-xs text-[#B69A69] font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Commercial Product Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#F5F5F2] tracking-tight break-words">
              Our Products
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#BFC3C8] leading-relaxed">
              Explore our range of architectural hardware, building materials and industrial solutions.
            </p>
          </div>

          {/* Demo disclaimer banner */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#23272C]/70 border border-[#BFC3C8]/15 flex items-start space-x-2.5 sm:space-x-3 text-xs text-[#BFC3C8] max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> All products, item codes, and specifications shown below represent sample entries for website prototype demonstration.
            </span>
          </div>
        </Container>
      </section>

      {/* Main Catalogue Layout */}
      <section className="py-8 sm:py-12 bg-[#17191C]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Desktop Category Sidebar (Column 1) */}
            <div className="hidden lg:block lg:col-span-1">
              <CategorySidebar
                categories={publishedCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                totalProducts={publishedProducts.length}
              />
            </div>

            {/* Main Content Area (Column 2-4) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter, Search & Sort Top Toolbar */}
              <ProductFilters
                categories={publishedCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                totalMatches={filteredProducts.length}
                totalProducts={publishedProducts.length}
              />

              {/* Product Grid or Empty State */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRequestQuote={handleOpenQuoteModal}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-[#23272C]/40 border border-[#BFC3C8]/15 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#17191C] border border-[#BFC3C8]/20 flex items-center justify-center text-[#B69A69] mx-auto">
                    <PackageSearch className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[#F5F5F2]">
                    No Matching Products Found
                  </h3>
                  <p className="text-sm text-[#BFC3C8] max-w-md mx-auto">
                    We could not find any sample products matching &ldquo;{searchQuery}&rdquo;. Try checking for spelling errors or clearing active category filters.
                  </p>
                  <div className="pt-2">
                    <Button variant="primary" size="sm" onClick={handleClearFilters}>
                      Reset All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={selectedProductForQuote}
      />
    </PageLayout>
  );
};

export default Products;
