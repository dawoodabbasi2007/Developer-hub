'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import API   from '../../../lib/axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const empty = { title: '', description: '', features: '', icon: '', is_active: true };

export default function ManageServicesPage() {
  const [services, setServices] = useState([]);
  const [form,     setForm]     = useState(empty);
  const [editId,   setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const fetchServices = () => API.get('/services/all').then(r => setServices(r.data));
  useEffect(() => { fetchServices(); }, []);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/services/${editId}`, payload);
        toast.success('Service updated successfully!');
      } else {
        await API.post('/services', payload);
        toast.success('Service created successfully!');
      }
      setForm(empty); setEditId(null); setShowForm(false);
      fetchServices();
    } catch { toast.error('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleEdit = (s) => {
    setForm({ title: s.title, description: s.description,
      features: (s.features || []).join(', '), icon: s.icon || '', is_active: s.is_active });
    setEditId(s.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await API.delete(`/services/${id}`);
      toast.success('Service deleted!');
      fetchServices();
    } catch { toast.error('Failed to delete service.'); }
  };

  const handleCancel = () => { setForm(empty); setEditId(null); setShowForm(false); };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
              <p className="text-gray-500 mt-1">{services.length} service{services.length !== 1 ? 's' : ''} total</p>
            </div>
            <button onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2">
              <FiPlus size={18} /> Add Service
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editId ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-700">
                  <FiX size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
                    <input required placeholder="e.g. Web Development" value={form.title} onChange={set('title')}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (optional)</label>
                    <input placeholder="e.g. 🖥️ or icon class" value={form.icon} onChange={set('icon')}
                      className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea required rows={3} placeholder="Describe this service..." value={form.description} onChange={set('description')}
                    className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
                  <input placeholder="React, Node.js, MongoDB, REST API" value={form.features} onChange={set('features')}
                    className="input-field" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_active" checked={form.is_active}
                    onChange={e => setForm({ ...form, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600" />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active (visible to public)
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : editId ? 'Update Service' : 'Create Service'}
                  </button>
                  <button type="button" onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-700">All Services</h2>
            </div>
            {services.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">⚙️</p>
                <p>No services yet. Add your first one!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-sm text-gray-500 font-semibold">
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Features</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s, idx) => (
                      <tr key={s.id} className="border-t hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-400 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{s.title}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm max-w-xs">
                          <p className="line-clamp-2">{s.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {s.features?.slice(0, 3).map((f, i) => (
                              <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{f}</span>
                            ))}
                            {s.features?.length > 3 && (
                              <span className="text-xs text-gray-400">+{s.features.length - 3} more</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {s.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(s)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                              <FiEdit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(s.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
