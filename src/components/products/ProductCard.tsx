import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Package, Clock } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onRequestQuote: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRequestQuote,
}) => {
  const [imgError, setImgError] = useState(false);
  const MotionDiv: React.ElementType = motion.div;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between bg-[#17191C] border border-[#BFC3C8]/15 rounded-2xl overflow-hidden hover:border-[#B69A69]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#B69A69]/5"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#23272C] overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#23272C] to-[#17191C]">
            <Package className="w-10 h-10 text-[#B69A69] mb-2 opacity-80" />
            <span className="text-xs font-semibold text-[#F5F5F2] font-heading">
              {product.name}
            </span>
            <span className="text-[10px] text-[#BFC3C8]/70 mt-1">
              Architectural Product Demo
            </span>
          </div>
        )}

        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-[#17191C]/90 text-[#B69A69] border border-[#B69A69]/30 backdrop-blur-md">
            {product.categoryName}
          </span>
        </div>

        {/* Demo Indicator */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0F1012]/80 text-[#BFC3C8] border border-[#BFC3C8]/20 backdrop-blur-md">
            {product.id}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Availability label */}
          <div className="flex items-center space-x-1.5 text-[11px] font-medium text-amber-300">
            <Clock className="w-3.5 h-3.5 text-[#B69A69]" />
            <span>{product.availability || 'Enquiry required'}</span>
            <span className="text-[#BFC3C8]/40">•</span>
            <span className="text-[#BFC3C8]/60 text-[10px]">Demo Listing</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold font-heading text-[#F5F5F2] group-hover:text-[#B69A69] transition-colors line-clamp-1">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-[#BFC3C8] line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#BFC3C8]/10 flex flex-wrap xs:flex-nowrap items-center justify-between gap-2">
          {/* View Details Button */}
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#F5F5F2] hover:text-[#B69A69] transition-colors py-2 min-h-[40px]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B69A69] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Request Quote Button */}
          <button
            type="button"
            onClick={() => onRequestQuote(product)}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-[#23272C] hover:bg-[#B69A69] text-[#F5F5F2] hover:text-[#17191C] border border-[#BFC3C8]/20 hover:border-[#B69A69] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 min-h-[40px] flex-1 xs:flex-none"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ProductCard;
