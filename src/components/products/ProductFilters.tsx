import React, { useState } from 'react';
import { Search, Filter, X, ArrowUpDown, ChevronDown, Check, Layers } from 'lucide-react';
import { Category } from '../../types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  totalMatches: number;
  totalProducts: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onClearFilters,
  totalMatches,
  totalProducts,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'name-asc';

  return (
    <div className="space-y-4">
      {/* Search & Top Sorting Bar */}
      <div className="p-4 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BFC3C8]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products by name, reference, SKU or keyword..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#23272C] border border-[#BFC3C8]/20 rounded-xl text-sm text-[#F5F5F2] placeholder-[#BFC3C8]/50 focus:outline-none focus:border-[#B69A69] focus:ring-1 focus:ring-[#B69A69] transition-all min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BFC3C8]/60 hover:text-[#F5F5F2] p-1.5 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Mobile Filter Toggle */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <span className="text-xs text-[#BFC3C8] shrink-0 hidden sm:inline flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex-1 sm:flex-none sm:w-auto px-3.5 py-2.5 bg-[#23272C] border border-[#BFC3C8]/20 rounded-xl text-xs font-semibold text-[#F5F5F2] focus:outline-none focus:border-[#B69A69] cursor-pointer min-h-[44px]"
            >
              <option value="name-asc">Alphabetical (A to Z)</option>
              <option value="name-desc">Alphabetical (Z to A)</option>
              <option value="category">Category Grouping</option>
              <option value="featured">Featured First</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden px-3.5 py-2.5 rounded-xl bg-[#23272C] border border-[#BFC3C8]/20 text-xs font-semibold text-[#F5F5F2] flex items-center justify-center space-x-1.5 shrink-0 hover:border-[#B69A69] cursor-pointer min-h-[44px]"
            >
              <Filter className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Active Filters & Counter Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#BFC3C8]/10 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[#BFC3C8]">
            <span>
              Showing <strong className="text-[#F5F5F2]">{totalMatches}</strong> of {totalProducts} products
            </span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-0.5 rounded bg-[#B69A69]/15 text-[#B69A69] text-[11px] font-semibold">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-[#B69A69] hover:underline inline-flex items-center space-x-1 cursor-pointer font-medium py-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Collapsible Category Menu */}
      {mobileOpen && (
        <div className="lg:hidden p-4 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#BFC3C8]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B69A69] font-heading">
              Product Categories ({categories.length})
            </span>
            <span className="text-[11px] text-[#BFC3C8]">Tap to filter</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => {
                onSelectCategory('all');
                setMobileOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                selectedCategory === 'all'
                  ? 'bg-[#B69A69] text-[#17191C] font-bold'
                  : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
              }`}
            >
              <span>All Categories</span>
              <span className="text-[10px] opacity-80">{totalProducts}</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.slug);
                  setMobileOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                  selectedCategory === cat.slug
                    ? 'bg-[#B69A69] text-[#17191C] font-bold'
                    : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
                }`}
              >
                <span className="line-clamp-1">{cat.name}</span>
                {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  totalProducts: number;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalProducts,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#17191C] border border-[#BFC3C8]/15 space-y-4 sticky top-24">
      <div className="flex items-center space-x-2 pb-3 border-b border-[#BFC3C8]/10 text-xs font-bold font-heading text-[#F5F5F2] uppercase tracking-wider">
        <Layers className="w-4 h-4 text-[#B69A69]" />
        <span>Product Categories</span>
      </div>

      <div className="flex flex-col space-y-1">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#B69A69] text-[#17191C] font-bold shadow-md shadow-[#B69A69]/10'
              : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
          }`}
        >
          <span>All Categories</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              selectedCategory === 'all'
                ? 'bg-[#17191C] text-[#B69A69]'
                : 'bg-[#23272C] text-[#BFC3C8]'
            }`}
          >
            {totalProducts}
          </span>
        </button>

        {categories.map((cat, index) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer group ${
                isSelected
                  ? 'bg-[#B69A69] text-[#17191C] font-bold shadow-md shadow-[#B69A69]/10'
                  : 'text-[#BFC3C8] hover:bg-[#23272C] hover:text-[#F5F5F2]'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className={`text-[10px] ${isSelected ? 'text-[#17191C]' : 'text-[#B69A69]'}`}>
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span className="line-clamp-1">{cat.name}</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-[#17191C] text-[#B69A69]'
                    : 'bg-[#23272C] text-[#BFC3C8] group-hover:text-[#F5F5F2]'
                }`}
              >
                {cat.productCount}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-3 border-t border-[#BFC3C8]/10 text-[11px] text-[#BFC3C8]/70 text-center">
        Demo catalogue for Metallix Trading
      </div>
    </div>
  );
};

export default ProductFilters;
