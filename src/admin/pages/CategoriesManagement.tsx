import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { useWebsiteData } from '../../context/WebsiteDataContext';
import { Category } from '../../types';

const CATEGORY_IMAGE_PRESETS = [
  { label: 'Hardware', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80' },
  { label: 'Joinery', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sealants', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fasteners', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Power Tools', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Stainless', url: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hand Rail', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Glass', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cladding', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
];

export const CategoriesManagement: React.FC = () => {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryPublish,
  } = useWebsiteData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Category | null>(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);

  const initialForm = {
    name: '',
    slug: '',
    description: '',
    image: CATEGORY_IMAGE_PRESETS[0].url,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingCategoryId(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategoryId(c.id);
    setFormData({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image || CATEGORY_IMAGE_PRESETS[0].url,
      isPublished: c.isPublished !== false,
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      formData.slug ||
      formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editingCategoryId) {
      updateCategory(editingCategoryId, {
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
        isPublished: formData.isPublished,
      });
    } else {
      addCategory({
        name: formData.name,
        slug,
        description: formData.description,
        image: formData.image,
        isPublished: formData.isPublished,
        productCount: 0,
      });
    }

    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (!deleteCandidate) return;

    const result = deleteCategory(deleteCandidate.id);
    if (!result.success) {
      setDeleteErrorMessage(result.error || 'Failed to delete category.');
    } else {
      setDeleteCandidate(null);
    }
  };

  return (
    <AdminLayout
      title="Product Categories Management"
      subtitle="Organize product taxonomy and filter categories across the public Metallix catalogue."
    >
      {/* Top action bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold font-heading text-slate-900">
            Active Product Categories ({categories.length})
          </h2>
          <p className="text-xs text-slate-500">
            Categories control the filter sidebar and classification of all trade hardware SKUs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Presentation: Mobile Card View & Desktop Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Mobile Card-Based Layout (< 768px) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {categories.map((cat) => {
            const assignedCount = products.filter((p) => p.categoryId === cat.id).length;
            const isPub = cat.isPublished !== false;

            return (
              <div key={cat.id} className="p-4 space-y-3 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-start space-x-3">
                  <img
                    src={cat.image || CATEGORY_IMAGE_PRESETS[0].url}
                    alt={cat.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold font-heading text-slate-900 leading-snug">
                        {cat.name}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          assignedCount > 0
                            ? 'bg-amber-50 text-amber-900 border border-amber-200/60'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {assignedCount} SKU{assignedCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">slug: {cat.slug}</div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCategoryPublish(cat.id)}
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
                      onClick={() => handleOpenEdit(cat)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 cursor-pointer"
                      title="Edit category"
                      aria-label="Edit category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDeleteErrorMessage(null);
                        setDeleteCandidate(cat);
                      }}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-red-600 rounded-xl hover:bg-red-50 cursor-pointer"
                      title="Delete category"
                      aria-label="Delete category"
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
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-center">Assigned SKUs</th>
                <th className="py-3.5 px-4 text-center">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {categories.map((cat) => {
                const assignedCount = products.filter((p) => p.categoryId === cat.id).length;
                const isPub = cat.isPublished !== false;

                return (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Category Name & Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={cat.image || CATEGORY_IMAGE_PRESETS[0].url}
                          alt={cat.name}
                          className="w-11 h-11 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{cat.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            slug: {cat.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 max-w-md">
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </td>

                    {/* Product count */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          assignedCount > 0
                            ? 'bg-amber-50 text-amber-900 border border-amber-200/60'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {assignedCount} Product{assignedCount !== 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleCategoryPublish(cat.id)}
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
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteErrorMessage(null);
                            setDeleteCandidate(cat);
                          }}
                          className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete category"
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

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCategoryId ? 'Edit Category' : 'Add New Category'}
        subtitle="Manage category nomenclature and imagery."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Category Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                setFormData({ ...formData, name, slug: editingCategoryId ? formData.slug : slug });
              }}
              placeholder="e.g. Architectural Hardware"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Category URL Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. architectural-hardware"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Category Description *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of hardware types within this category..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          {/* Image & Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Image URL</label>
            <div className="flex items-center space-x-3">
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
              <img
                src={formData.image}
                alt="Preview"
                className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CATEGORY_IMAGE_PRESETS.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData({ ...formData, image: p.url })}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors ${
                    formData.image === p.url
                      ? 'bg-[#B69A69] text-white border-[#B69A69]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
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
              <span className="font-semibold">Published (Visible in Public Filter Navigation)</span>
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
              {editingCategoryId ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteCandidate}
        onClose={() => {
          setDeleteCandidate(null);
          setDeleteErrorMessage(null);
        }}
        onConfirm={handleDelete}
        title="Delete Category?"
        message={
          deleteErrorMessage ||
          `Are you sure you want to delete category "${deleteCandidate?.name}"? Note: Categories with assigned products cannot be deleted until those products are reassigned.`
        }
        confirmLabel="Confirm Delete"
      />
    </AdminLayout>
  );
};

export default CategoriesManagement;
