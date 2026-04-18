'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import API   from '../../../lib/axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiExternalLink, FiGithub } from 'react-icons/fi';

const empty = { title: '', description: '', image: '', category: 'Web Development',
  technologies: '', liveUrl: '', githubUrl: '', isActive: true };

export default function ManagePortfolioPage() {
  const [items,    setItems]    = useState([]);
  const [form,     setForm]     = useState(empty);
  const [editId,   setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const fetchItems = () => API.get('/portfolio/all').then(r => setItems(r.data));
  useEffect(() => { fetchItems(); }, []);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/portfolio/${editId}`, payload);
        toast.success('Portfolio item updated!');
      } else {
        await API.post('/portfolio', payload);
        toast.success('Portfolio item created!');
      }
      setForm(empty); setEditId(null); setShowForm(false);
      fetchItems();
    } catch { toast.error('Something went wrong.'); }
    finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description, image: item.image || '',
      category: item.category || 'Web Development',
      technologies: item.technologies?.join(', ') || '',
      live_url: item.live_url || '', github_url: item.github_url || '', is_active: item.is_active });
    setEditId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this portfolio item?')) return;
    try {
      await API.delete(`/portfolio/${id}`);
      toast.success('Deleted successfully!');
      fetchItems();
    } catch { toast.error('Failed to delete.'); }
  };

  const handleCancel = () => { setForm(empty); setEditId(null); setShowForm(false); };

  const categories = ['Web Development', 'Mobile App', 'UI/UX Design', 'E-Commerce', 'Other'];

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Portfolio</h1>
              <p className="text-gray-500 mt-1">{items.length} project{items.length !== 1 ? 's' : ''} total</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
              <FiPlus size={18} /> Add Project
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editId ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-700"><FiX size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                    <input required placeholder="e.g. E-Commerce Platform" value={form.title} onChange={set('title')}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={form.category} onChange={set('category')} className="input-field">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea required rows={3} placeholder="Describe this project..." value={form.description} onChange={set('description')}
                    className="input-field resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                    <input placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={set('technologies')}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                    <input placeholder="https://example.com/image.jpg" value={form.image} onChange={set('image')}
                      className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                    <input placeholder="https://myproject.com" value={form.live_url} onChange={set('liveUrl')}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                    <input placeholder="https://github.com/user/repo" value={form.github_url} onChange={set('githubUrl')}
                      className="input-field" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="portActive" checked={form.is_active}
                    onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 text-blue-600" />
                  <label htmlFor="portActive" className="text-sm font-medium text-gray-700">Active (visible to public)</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : editId ? 'Update Project' : 'Create Project'}
                  </button>
                  <button type="button" onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid */}
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🗂️</p>
              <p>No portfolio items yet. Add your first project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl font-bold text-blue-300">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : item.title.charAt(0)}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-medium mb-2">{item.category}</p>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{item.description}</p>
                    {item.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.technologies.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-gray-400">
                        {item.live_url && <a href={item.live_url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-blue-500 hover:underline"><FiExternalLink size={12}/> Live</a>}
                        {item.github_url && <a href={item.github_url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-gray-500 hover:underline"><FiGithub size={12}/> Repo</a>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><FiEdit2 size={15} /></button>
                        <button onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
