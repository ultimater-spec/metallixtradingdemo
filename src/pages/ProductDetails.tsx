import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import ProductCard from '../components/products/ProductCard';
import QuoteModal from '../components/products/QuoteModal';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Product } from '../types';
import {
  ArrowLeft,
  Clock,
  ShieldAlert,
  FileText,
  Tag,
  Layers,
  ChevronRight,
  Package,
  Sparkles,
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const { products } = useWebsiteData();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [imgError, setImgError] = useState(false);

  // Look up product by either ID or slug
  const productIdentifier = id || slug || '';
  const product = products.find(
    (p) =>
      p.id.toLowerCase() === productIdentifier.toLowerCase() ||
      p.slug.toLowerCase() === productIdentifier.toLowerCase()
  );

  const handleOpenQuote = (prod: Product) => {
    setSelectedProductForModal(prod);
    setIsQuoteModalOpen(true);
  };

  if (!product) {
    return (
      <PageLayout
        title="Product Not Found | Metallix Trading"
        description="The requested product could not be located in our sample catalogue."
      >
        <section className="py-24 bg-[#17191C]">
          <Container className="text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#23272C] border border-[#BFC3C8]/20 flex items-center justify-center text-[#B69A69] mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold font-heading text-[#F5F5F2]">
              Product Not Found
            </h1>
            <p className="text-sm text-[#BFC3C8] leading-relaxed">
              We could not find the product &ldquo;{productIdentifier}&rdquo; in our sample catalogue. It may have been relocated or updated.
            </p>
            <div className="pt-2">
              <Button to="/products" variant="primary" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
                Return to Product Catalogue
              </Button>
            </div>
          </Container>
        </section>
      </PageLayout>
    );
  }

  // Related products from the same category (excluding current product)
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  return (
    <PageLayout
      title={`${product.name} | ${product.categoryName} | Metallix Trading`}
      description={`${product.name} (${product.id}) - ${product.shortDescription}`}
    >
      {/* Breadcrumb Bar */}
      <section className="py-3 sm:py-4 bg-[#0F1012] border-b border-[#BFC3C8]/10 text-xs text-[#BFC3C8]">
        <Container>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
            <Link to="/" className="hover:text-[#B69A69] transition-colors py-0.5">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <Link to="/products" className="hover:text-[#B69A69] transition-colors py-0.5">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <Link
              to={`/products?category=${product.categoryId}`}
              className="hover:text-[#B69A69] transition-colors py-0.5"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#BFC3C8]/40 shrink-0" />
            <span className="text-[#F5F5F2] line-clamp-1 py-0.5">{product.name}</span>
          </nav>
        </Container>
      </section>

      {/* Main Product Showcase */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#17191C]">
        <Container>
          {/* Back button */}
          <div className="mb-4 sm:mb-6">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#BFC3C8] hover:text-[#B69A69] transition-colors py-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products Catalogue</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Large Product Image Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl bg-[#23272C] border border-[#BFC3C8]/20 overflow-hidden shadow-2xl">
                {!imgError ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#23272C] to-[#17191C]">
                    <Package className="w-16 h-16 text-[#B69A69] mb-3 opacity-75" />
                    <span className="text-sm font-semibold text-[#F5F5F2] font-heading">
                      {product.name}
                    </span>
                    <span className="text-xs text-[#BFC3C8]/70 mt-1">
                      Architectural Sample Visual
                    </span>
                  </div>
                )}

                {/* Demo overlay badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-[#17191C]/90 text-[#B69A69] border border-[#B69A69]/30 backdrop-blur-md">
                    Ref: {product.id}
                  </span>
                </div>
              </div>

              {/* Demo Notice Disclaimer */}
              <div className="p-3 rounded-xl bg-[#23272C]/60 border border-[#BFC3C8]/15 flex items-start space-x-2.5 text-xs text-[#BFC3C8]">
                <ShieldAlert className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                <span>
                  <strong>Sample Item:</strong> Demonstration entry for website preview. Actual commercial orders are processed through enquiry.
                </span>
              </div>
            </div>

            {/* Right: Product Information Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Status Row */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/products?category=${product.categoryId}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#B69A69]/15 text-[#B69A69] border border-[#B69A69]/30 hover:bg-[#B69A69]/25 transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{product.categoryName}</span>
                </Link>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{product.availability || 'Enquiry required'}</span>
                </div>
              </div>

              {/* Title & Product Reference */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#F5F5F2] tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-3 text-xs text-[#BFC3C8]">
                  <span>Product Reference:</span>
                  <span className="font-mono font-semibold text-[#B69A69] bg-[#23272C] px-2 py-0.5 rounded border border-[#BFC3C8]/15">
                    {product.id}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none text-sm text-[#BFC3C8] leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Specifications Grid */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold font-heading uppercase tracking-wider text-[#F5F5F2] flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#B69A69]" />
                    <span>Technical & Material Specifications</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3 rounded-xl bg-[#23272C]/40 border border-[#BFC3C8]/10 flex flex-col justify-between"
                      >
                        <span className="text-[#BFC3C8]/70 text-[11px]">{key}</span>
                        <span className="text-[#F5F5F2] font-semibold mt-1">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications List (if any) */}
              {product.applications && product.applications.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F2] font-heading">
                    Typical Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[#23272C] text-[#BFC3C8] border border-[#BFC3C8]/15"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Action Row */}
              <div className="pt-6 border-t border-[#BFC3C8]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 [&>*]:w-full sm:[&>*]:w-auto [&>*]:justify-center">
                <Button
                  size="lg"
                  variant="primary"
                  icon={<FileText className="w-4 h-4" />}
                  onClick={() => handleOpenQuote(product)}
                >
                  Request a Quote
                </Button>

                <Button
                  to="/contact"
                  size="lg"
                  variant="secondary"
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  General Contact
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products from the same category */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#0F1012] border-t border-[#BFC3C8]/10">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B69A69]">
                  Related Items
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#F5F5F2] mt-1">
                  More in {product.categoryName}
                </h2>
              </div>
              <Link
                to={`/products?category=${product.categoryId}`}
                className="text-xs font-semibold text-[#B69A69] hover:underline py-1 min-h-[36px] flex items-center"
              >
                View all in {product.categoryName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onRequestQuote={handleOpenQuote}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={selectedProductForModal}
      />
    </PageLayout>
  );
};

export default ProductDetails;
