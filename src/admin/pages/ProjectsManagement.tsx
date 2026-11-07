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
import { Project } from '../../types';

const PROJECT_IMAGE_PRESETS = [
  { label: 'High-Rise Tower', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Civic Canopy', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Glass Entrance', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Atrium Balustrade', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Executive Millwork', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Structural Curtain Wall', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80' },
];

const APPLICATION_CATEGORIES = [
  'Architectural Applications',
  'Glass & Hardware',
  'Interior Fittings',
  'Building Materials',
];

export const ProjectsManagement: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectPublish,
  } = useWebsiteData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Project | null>(null);

  const initialForm = {
    title: '',
    category: APPLICATION_CATEGORIES[0],
    sector: 'Commercial Architecture',
    description: '',
    image: PROJECT_IMAGE_PRESETS[0].url,
    materialsText: 'Cladding Sheets, Fasteners, Sealants',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingProjectId(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProjectId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      sector: p.sector || '',
      description: p.description,
      image: p.image,
      materialsText: (p.materialsSupplied || []).join(', '),
      isPublished: p.isPublished !== false,
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const materialsArray = formData.materialsText
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: formData.title,
        category: formData.category,
        sector: formData.sector,
        description: formData.description,
        image: formData.image,
        materialsSupplied: materialsArray,
        isPublished: formData.isPublished,
      });
    } else {
      addProject({
        title: formData.title,
        category: formData.category,
        sector: formData.sector,
        description: formData.description,
        image: formData.image,
        materialsSupplied: materialsArray,
        isPublished: formData.isPublished,
        isDemoVisual: true,
      });
    }

    setIsFormOpen(false);
  };

  return (
    <AdminLayout
      title="Projects & Application Gallery"
      subtitle="Manage architectural applications, installation galleries, and material supply case studies."
    >
      {/* Top action bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold font-heading text-slate-900">
            Showcase Gallery ({projects.length})
          </h2>
          <p className="text-xs text-slate-500">
            Illustrative project installations featured on the public /projects gallery page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project Visual</span>
        </button>
      </div>

      {/* Mobile Card View (block md:hidden) */}
      <div className="block md:hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No project showcases found. Add one above.
          </div>
        ) : (
          projects.map((proj) => {
            const isPub = proj.isPublished !== false;

            return (
              <div key={proj.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-16 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {proj.title}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{proj.sector}</div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 mt-1">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {proj.materialsSupplied && proj.materialsSupplied.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.materialsSupplied.map((m, i) => (
                      <span
                        key={i}
                        className="inline-flex text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleProjectPublish(proj.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 min-h-[38px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isPub
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {isPub ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPub ? 'Published' : 'Hidden'}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(proj)}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-blue-600 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50 transition-colors"
                      title="Edit project"
                      aria-label="Edit project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteCandidate(proj)}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-red-600 rounded-xl bg-slate-50 border border-slate-200 hover:bg-red-50 transition-colors"
                      title="Delete project"
                      aria-label="Delete project"
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

      {/* Projects Table (hidden md:block) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Project Visual</th>
                <th className="py-3.5 px-4">Application Category</th>
                <th className="py-3.5 px-4">Materials Supplied</th>
                <th className="py-3.5 px-4 text-center">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.map((proj) => {
                const isPub = proj.isPublished !== false;

                return (
                  <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Visual & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3 max-w-sm">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-14 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">{proj.title}</div>
                          <div className="text-[11px] text-slate-500 truncate">{proj.sector}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60">
                        {proj.category}
                      </span>
                    </td>

                    {/* Materials */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.materialsSupplied?.map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Visibility */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleProjectPublish(proj.id)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 min-h-[36px] rounded-full text-[11px] font-bold transition-all cursor-pointer ${
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
                          onClick={() => handleOpenEdit(proj)}
                          className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit project"
                          aria-label="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteCandidate(proj)}
                          className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete project"
                          aria-label="Delete project"
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

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProjectId ? 'Edit Project Gallery Item' : 'Add New Project Visual'}
        subtitle="Configure application imagery and material specifications."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Project Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Commercial High-Rise Exterior Facade"
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Application Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              >
                {APPLICATION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Sector / Application Scope</label>
              <input
                type="text"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                placeholder="e.g. Commercial Fit-Out"
                className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
            </div>
          </div>

          {/* Image & Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Project Image URL *</label>
            <div className="flex items-center space-x-3">
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
              />
              <img
                src={formData.image}
                alt="Preview"
                className="w-14 h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PROJECT_IMAGE_PRESETS.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFormData({ ...formData, image: p.url })}
                  className={`text-[11px] px-3 py-1.5 min-h-[36px] rounded-lg border transition-colors ${
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Materials Supplied (comma-separated)</label>
            <input
              type="text"
              value={formData.materialsText}
              onChange={(e) => setFormData({ ...formData, materialsText: e.target.value })}
              placeholder="e.g. Cladding Sheets, Fasteners, Structural Sealants"
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Description *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of how hardware was applied in this installation..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-xs text-slate-900 focus:outline-none focus:border-[#B69A69] focus:bg-white"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold">Published (Visible on Public Projects Page)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold bg-[#B69A69] hover:bg-[#a58957] text-[#17191C] shadow-xs transition-colors cursor-pointer flex items-center justify-center"
            >
              {editingProjectId ? 'Save Changes' : 'Create Project'}
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
            deleteProject(deleteCandidate.id);
            setDeleteCandidate(null);
          }
        }}
        title="Delete Project Item?"
        message={`Are you sure you want to delete "${deleteCandidate?.title}"?`}
        confirmLabel="Confirm Delete"
      />
    </AdminLayout>
  );
};

export default ProjectsManagement;
