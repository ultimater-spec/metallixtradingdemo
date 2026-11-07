import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  PackageSearch,
  RotateCcw,
} from 'lucide-react';
import AdminLayout from '../../admin/components/AdminLayout';
import Modal from '../../admin/components/Modal';
import ConfirmModal from '../../admin/components/ConfirmModal';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Product } from '../../types';

interface ProductFormData {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  image: string;
  shortDescription: string;
  description: string;
  availability: string;
  grade: string;
  finish: string;
  isFeatured: boolean;
  isPublished: boolean;
  specifications: { key: string; value: string }[];
}

const PRESET_IMAGES = [
  { label: 'Door Lock', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80' },
  { label: 'Joinery Fittings', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sealants & Glue', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fasteners & Screws', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Power Tools', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hand Tools', url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Stainless Steel', url: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Glass Fittings', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
];

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductPublish,
    toggleProductFeatured,
  } = useWebsiteData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  // Form State
  const initialFormState: ProductFormData = {
    id: '',
    name: '',
    slug: '',
    categoryId: categories[0]?.id || 'architectural-hardware',
    categoryName: categories[0]?.name || 'Architectural Hardware',
    image: PRESET_IMAGES[0].url,
    shortDescription: '',
    description: '',
    availability: 'Enquiry required',
    grade: 'Commercial Grade SS304',
    finish: 'Satin Stainless Steel',
    isFeatured: false,
    isPublished: true,
    specifications: [
      { key: 'Material', value: 'Grade 304 Stainless Steel' },
      { key: 'Application', value: 'Commercial & Residential Doors' },
    ],
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormState);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      (p.referenceNumber ? p.referenceNumber.toLowerCase().includes(q) : false) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.grade ? p.grade.toLowerCase().includes(q) : false) ||
      p.shortDescription.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'all' || p.categoryId === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all'
        ? true
        : selectedStatus === 'published'
        ? p.isPublished !== false
        : p.isPublished === false;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingProductId(null);
    const newRef = `DEMO-PRD-${Math.floor(100 + Math.random() * 900)}`;
    setFormData({
      ...initialFormState,
      id: newRef,
      categoryId: categories[0]?.id || 'architectural-hardware',
      categoryName: categories[0]?.name || 'Architectural Hardware',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id);
    const specsArray = Object.entries(p.specifications || {}).map(([key, value]) => ({
      key,
      value,
    }));

    setFormData({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      image: p.image,
      shortDescription: p.shortDescription,
      description: p.description,
      availability: p.availability || 'Enquiry required',
      grade: p.grade || '',
      finish: p.finish || '',
      isFeatured: !!p.isFeatured,
      isPublished: p.isPublished !== false,
      specifications: specsArray.length > 0 ? specsArray : [{ key: 'Material', value: 'High grade' }],
    });
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Map specs array back to Record
    const specRecord: Record<string, string> = {};
    formData.specifications.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specRecord[s.key.trim()] = s.value.trim();
      }
    });

    // Derive category name
    const foundCat = categories.find((c) => c.id === formData.categoryId);
    const categoryName = foundCat ? foundCat.name : formData.categoryName;
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formData.name,
        slug,
        categoryId: formData.categoryId,
        categoryName,
        image: formData.image,
        shortDescription: formData.shortDescription,
        description: formData.description,
        availability: formData.availability,
        grade: formData.grade,
        finish: formData.finish,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        specifications: specRecord,
        referenceNumber: formData.id,
      });
    } else {
      addProduct({
        id: formData.id || `DEMO-PRD-${Date.now().toString().slice(-4)}`,
        referenceNumber: formData.id || `DEMO-PRD-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        slug,
        categoryId: formData.categoryId,
        categoryName,
        image: formData.image,
        shortDescription: formData.shortDescription,
        description: formData.description,
        availability: formData.availability,
        grade: formData.grade,
        finish: formData.finish,
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished,
        isDemo: true,
        specifications: specRecord,
      });
    }

    setIsFormOpen(false);
  };

  const handleAddSpecRow = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }],
    });
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index),
    });
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...formData.specifications];
    updated[index][field] = val;
    setFormData({ ...formData, specifications: updated });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <AdminLayout
      title="Product Catalogue Management"
      subtitle="Add, modify, publish, or remove architectural and industrial hardware items across all categories."
    >
      {/* Top Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, SKU or grade..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#B69A69] focus:bg-white transition-all min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#B69A69] min-h-[44px] cursor-pointer"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-[#B69A69] min-h-[44px] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Add Product Button */}
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Presentation: Desktop Table & Mobile Card View */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Mobile Card-Based Layout (< 768px) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredProducts.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B69A69] border border-amber-200/60 flex items-center justify-center mx-auto">
                  <PackageSearch className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-heading text-slate-900">
                    {products.length === 0 ? 'No products in catalogue' : 'No matching products'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {products.length === 0
                      ? 'Create your first product to get started.'
                      : 'Try clearing your search query or filters.'}
                  </p>
                </div>
                {products.length === 0 ? (
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#B69A69] text-[#17191C] font-semibold text-xs min-h-[44px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First Product</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs min-h-[44px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const isPub = p.isPublished !== false;
              return (
                <div key={p.id} className="p-4 space-y-3 hover:bg-slate-50/70 transition-colors">
                  {/* Top: Image, Name, SKU */}
                  <div className="flex items-start space-x-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                        <span className="font-mono text-[10px] font-bold text-[#B69A69] bg-[#17191C] px-2 py-0.5 rounded">
                          {p.referenceNumber || p.id}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {p.categoryName}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug line-clamp-2">
                        {p.name}
                      </h4>
                      {p.grade && (
                        <p className="text-[11px] text-slate-500 line-clamp-1">{p.grade}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Status Ribbon */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5">
                      {/* Featured button */}
                      <button
                        type="button"
                        onClick={() => toggleProductFeatured(p.id)}
                        className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                        }`}
                        title={p.isFeatured ? 'Featured on home' : 'Click to feature on home'}
                        aria-label="Toggle featured"
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>

                      {/* Publish toggle */}
                      <button
                        type="button"
                        onClick={() => toggleProductPublish(p.id)}
                        className={`min-h-[44px] px-3 flex items-center space-x-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isPub
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                        title="Click to toggle visibility"
                      >
                        {isPub ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{isPub ? 'Published' : 'Draft'}</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Link
                        to={`/products/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-[#B69A69] rounded-xl hover:bg-slate-100"
                        title="Preview"
                        aria-label="Preview product"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 cursor-pointer"
                        title="Edit"
                        aria-label="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteCandidate(p)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer"
                        title="Delete"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Data Table Layout (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Item Details</th>
                <th className="py-3.5 px-4">Product Reference</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B69A69] border border-amber-200/60 flex items-center justify-center mx-auto">
                        <PackageSearch className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-heading text-slate-900">
                          {products.length === 0
                            ? 'No products in the catalogue yet'
                            : 'No matching products found'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {products.length === 0
                            ? 'Get started by creating your first architectural or building hardware product.'
                            : 'Try adjusting your search terms or clearing current category and status filters.'}
                        </p>
                      </div>
                      {products.length === 0 ? (
                        <button
                          type="button"
                          onClick={handleOpenAdd}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] font-semibold text-xs transition-colors shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Your First Product</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Clear All Filters</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isPub = p.isPublished !== false;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Product Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3 max-w-sm">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                            }}
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-[#B69A69] transition-colors truncate">
                              {p.name}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {p.shortDescription}
                            </p>
                            {p.grade && (
                              <span className="text-[10px] text-slate-400">
                                {p.grade}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Product Reference */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                          {p.referenceNumber || p.id}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60">
                          {p.categoryName}
                        </span>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProductFeatured(p.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            p.isFeatured
                              ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                              : 'text-slate-300 hover:text-slate-400'
                          }`}
                          title={p.isFeatured ? 'Featured on Homepage (Click to unfeature)' : 'Mark as featured'}
                        >
                          <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Published / Draft status */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProductPublish(p.id)}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            isPub
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle public visibility"
                        >
                          {isPub ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{isPub ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link
                            to={`/products/${p.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-[#B69A69] rounded-lg hover:bg-slate-100 transition-colors"
                            title="Preview on public website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(p)}
                            className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer count */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Showing {filteredProducts.length} of {products.length} total products</span>
          <span className="text-[11px] text-slate-400">
            Changes immediately update the public catalogue and detail views.
          </span>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProductId ? 'Edit Product Item' : 'Add New Hardware Product'}
        subtitle="Manage product name, reference, category, specifications, and media preview."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Heavy-Duty Mortise Door Lock Body"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            {/* SKU / Reference */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Product Reference (SKU) *</label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="e.g. DEMO-AH-001"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Product Category *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => {
                  const catId = e.target.value;
                  const found = categories.find((c) => c.id === catId);
                  setFormData({
                    ...formData,
                    categoryId: catId,
                    categoryName: found ? found.name : formData.categoryName,
                  });
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Material Grade */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Material Grade / Standard</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g. Grade 304 Stainless Steel / Brass"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>

          {/* Image Selection with Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Product Image URL *</label>
              <span className="text-[10px] text-slate-400">Select preset or enter custom image URL:</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <ImageIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
                />
              </div>
              <img
                src={formData.image}
                alt="Preview"
                className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                }}
              />
            </div>
            {/* Quick Preset Selector */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESET_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData({ ...formData, image: img.url })}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                    formData.image === img.url
                      ? 'bg-[#B69A69] text-white border-[#B69A69] font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Short Summary *</label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Concise 1-sentence product summary for card views"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          {/* Detailed Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Detailed Description *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="In-depth technical breakdown and application guidance..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          {/* Specifications Builder */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Technical Specifications (Key / Value Pairs)
              </label>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs text-[#B69A69] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Specification Row</span>
              </button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {formData.specifications.map((spec, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Parameter (e.g. Backset)"
                    className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 55mm / 60mm)"
                    className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                    title="Remove specification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-300 text-[#B69A69] focus:ring-[#B69A69]"
              />
              <span className="font-semibold">Featured on Homepage</span>
            </label>

            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold">Published (Visible on Public Website)</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 xs:space-x-2.5 [&>*]:w-full xs:[&>*]:w-auto [&>*]:justify-center">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] shadow-xs transition-colors cursor-pointer min-h-[44px]"
            >
              {editingProductId ? 'Save Product Changes' : 'Create & Publish Product'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={() => {
          if (deleteCandidate) {
            deleteProduct(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
        title="Delete Catalogue Product?"
        message={`Are you sure you want to permanently delete "${deleteCandidate?.name}" (Ref: ${deleteCandidate?.referenceNumber || deleteCandidate?.id})? This will immediately remove it from the public catalogue.`}
        confirmLabel="Yes, Delete Product"
      />
    </AdminLayout>
  );
};

export default AdminProducts;

