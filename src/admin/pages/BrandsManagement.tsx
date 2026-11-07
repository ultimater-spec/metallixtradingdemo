import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Shield,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Brand } from '../../types';

export const BrandsManagement: React.FC = () => {
  const {
    brands,
    categories,
    addBrand,
    updateBrand,
    deleteBrand,
    toggleBrandPublish,
  } = useWebsiteData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Brand | null>(null);

  const initialForm = {
    name: '',
    tagline: '',
    origin: 'Partner Manufacturer (Demo)',
    description: '',
    categories: [] as string[],
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingBrandId(null);
    setFormData({
      ...initialForm,
      categories: [categories[0]?.name || 'Architectural Hardware'],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (b: Brand) => {
    setEditingBrandId(b.id);
    setFormData({
      name: b.name,
      tagline: b.tagline || '',
      origin: b.origin || 'Partner Manufacturer (Demo)',
      description: b.description,
      categories: b.categories || [],
      isPublished: b.isPublished !== false,
    });
    setIsFormOpen(true);
  };

  const toggleCategorySelection = (catName: string) => {
    if (formData.categories.includes(catName)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((c) => c !== catName),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, catName],
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBrandId) {
      updateBrand(editingBrandId, {
        name: formData.name,
        tagline: formData.tagline,
        origin: formData.origin,
        description: formData.description,
        categories: formData.categories,
        isPublished: formData.isPublished,
      });
    } else {
      addBrand({
        name: formData.name,
        tagline: formData.tagline,
        origin: formData.origin,
        description: formData.description,
        categories: formData.categories,
        isPublished: formData.isPublished,
      });
    }

    setIsFormOpen(false);
  };

  return (
    <AdminLayout
      title="Brand & Manufacturing Partners"
      subtitle="Manage hardware manufacturer profiles and associated product categories."
    >
      {/* Top action bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold font-heading text-slate-900">
            Sourced Partner Brands ({brands.length})
          </h2>
          <p className="text-xs text-slate-500">
            Brands displayed on the public /brands page and linked to catalogue categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Brands Presentation: Mobile Card View & Desktop Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Mobile Card-Based Layout (< 768px) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {brands.map((brand) => {
            const isPub = brand.isPublished !== false;

            return (
              <div key={brand.id} className="p-4 space-y-3 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#B69A69] shrink-0 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug">
                        {brand.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {brand.origin || 'Trading Partner'}
                      </span>
                    </div>
                    {brand.tagline && (
                      <div className="text-xs font-medium text-[#B69A69]">{brand.tagline}</div>
                    )}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>
                </div>

                {/* Categories */}
                {brand.categories && brand.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {brand.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="inline-flex text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleBrandPublish(brand.id)}
                    className={`min-h-[44px] px-3.5 flex items-center space-x-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPub
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isPub ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPub ? 'Published' : 'Hidden'}</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(brand)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 cursor-pointer"
                      title="Edit brand"
                      aria-label="Edit brand"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteCandidate(brand)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer"
                      title="Delete brand"
                      aria-label="Delete brand"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Brand & Tagline</th>
                <th className="py-3.5 px-4">Origin / Profile</th>
                <th className="py-3.5 px-4">Associated Categories</th>
                <th className="py-3.5 px-4 text-center">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {brands.map((brand) => {
                const isPub = brand.isPublished !== false;

                return (
                  <tr key={brand.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Brand Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#B69A69] shrink-0 font-bold">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{brand.name}</div>
                          <div className="text-[11px] text-slate-500">{brand.tagline}</div>
                        </div>
                      </div>
                    </td>

                    {/* Origin & Description */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-[11px] font-semibold text-slate-800">{brand.origin}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{brand.description}</p>
                    </td>

                    {/* Associated Categories */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {brand.categories?.map((cat, i) => (
                          <span
                            key={i}
                            className="inline-flex text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Visibility */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleBrandPublish(brand.id)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          isPub
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle public visibility"
                      >
                        {isPub ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{isPub ? 'Published' : 'Hidden'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(brand)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit brand"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteCandidate(brand)}
                          className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete brand"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Brand Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingBrandId ? 'Edit Brand Profile' : 'Add New Partner Brand'}
        subtitle="Manage manufacturing partner details and assigned product categories."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Brand Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Hardware Systems A"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Tagline *</label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Commercial Door Controls"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Origin / Status Note</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              placeholder="Partner Manufacturer (Demo)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Description *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Representative profile of manufacturing partner..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          {/* Category selection */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="text-xs font-bold text-slate-800">
              Associated Product Categories
            </label>
            <p className="text-[11px] text-slate-500">
              Select one or more categories supplied by this brand partner:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {categories.map((c) => {
                const isSelected = formData.categories.includes(c.name);
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => toggleCategorySelection(c.name)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-[#B69A69] text-white border-[#B69A69] font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold">Published (Visible on Public Brands Page)</span>
            </label>
          </div>

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
              {editingBrandId ? 'Save Changes' : 'Create Brand'}
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
            deleteBrand(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
        title="Delete Brand Profile?"
        message={`Are you sure you want to delete brand "${deleteCandidate?.name}"?`}
        confirmLabel="Confirm Delete"
      />
    </AdminLayout>
  );
};

export default BrandsManagement;
