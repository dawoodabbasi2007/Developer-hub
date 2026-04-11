'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import API   from '../../../lib/axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const empty = { title: '', content: '', summary: '', image: '', author: 'Admin', tags: '', isPublished: false };

export default function ManageBlogPage() {
  const [blogs,    setBlogs]    = useState([]);
  const [form,     setForm]     = useState(empty);
  const [editId,   setEditId]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const fetchBlogs = () => API.get('/blog/all').then(r => setBlogs(r.data));
  useEffect(() => { fetchBlogs(); }, []);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await API.put(`/blog/${editId}`, payload);
        toast.success('Blog post updated!');
      } else {
        await API.post('/blog', payload);
        toast.success('Blog post created!');
      }
      setForm(empty); setEditId(null); setShowForm(false);
      fetchBlogs();
    } catch { toast.error('Something went wrong.'); }
    finally { setLoading(false); }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content, summary: blog.summary || '',
      image: blog.image || '', author: blog.author || 'Admin',
      tags: blog.tags?.join(', ') || '', isPublished: blog.isPublished });
    setEditId(blog._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await API.delete(`/blog/${id}`);
      toast.success('Blog post deleted!');
      fetchBlogs();
    } catch { toast.error('Failed to delete.'); }
  };

  const togglePublish = async (blog) => {
    try {
      await API.put(`/blog/${blog._id}`, { ...blog, isPublished: !blog.isPublished });
      toast.success(blog.isPublished ? 'Post unpublished.' : 'Post published!');
      fetchBlogs();
    } catch { toast.error('Failed to update status.'); }
  };

  const handleCancel = () => { setForm(empty); setEditId(null); setShowForm(false); };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Blog</h1>
              <p className="text-gray-500 mt-1">{blogs.length} post{blogs.length !== 1 ? 's' : ''} total</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
              <FiPlus size={18} /> New Post
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{editId ? 'Edit Blog Post' : 'Create New Post'}</h2>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-700"><FiX size={22} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Title *</label>
                  <input required placeholder="Enter a compelling title..." value={form.title} onChange={set('title')}
                    className="input-field" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input placeholder="Author name" value={form.author} onChange={set('author')} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                    <input placeholder="https://example.com/image.jpg" value={form.image} onChange={set('image')} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Summary (shown in blog list)</label>
                  <textarea rows={2} placeholder="Brief description of the post..." value={form.summary} onChange={set('summary')}
                    className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content * (HTML supported)</label>
                  <textarea required rows={10} placeholder="Write your blog content here... (HTML tags supported)"
                    value={form.content} onChange={set('content')} className="input-field resize-y font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                  <input placeholder="React, JavaScript, Web Dev" value={form.tags} onChange={set('tags')} className="input-field" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="isPublished" checked={form.isPublished}
                    onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 text-blue-600" />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish immediately (visible to public)
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : editId ? 'Update Post' : 'Create Post'}
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
              <h2 className="font-semibold text-gray-700">All Posts</h2>
            </div>
            {blogs.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📝</p>
                <p>No blog posts yet. Write your first one!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-sm text-gray-500 font-semibold">
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Author</th>
                      <th className="px-6 py-3">Tags</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog, idx) => (
                      <tr key={blog._id} className="border-t hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-400 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs">
                          <p className="line-clamp-1">{blog.title}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags?.slice(0, 2).map((t, i) => (
                              <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => togglePublish(blog)} title={blog.isPublished ? 'Unpublish' : 'Publish'}
                              className={`p-2 rounded-lg transition ${
                                blog.isPublished
                                  ? 'text-yellow-500 hover:bg-yellow-50'
                                  : 'text-green-500 hover:bg-green-50'
                              }`}>
                              {blog.isPublished ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                            </button>
                            <button onClick={() => handleEdit(blog)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><FiEdit2 size={16} /></button>
                            <button onClick={() => handleDelete(blog._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={16} /></button>
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
