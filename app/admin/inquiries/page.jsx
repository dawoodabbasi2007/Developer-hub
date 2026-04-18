'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import API   from '../../../lib/axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

export default function ManageInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);
  const [filter,    setFilter]    = useState('all');

  const fetchInquiries = () => {
    API.get('/inquiries')
      .then(r => setInquiries(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/inquiries/${id}`, { status });
      toast.success(`Status updated to "${status}"`);
      fetchInquiries();
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch { toast.error('Failed to update status.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await API.delete(`/inquiries/${id}`);
      toast.success('Inquiry deleted.');
      if (selected?.id === id) setSelected(null);
      fetchInquiries();
    } catch { toast.error('Failed to delete.'); }
  };

  const statusColor = (status) => {
    if (status === 'new')     return 'bg-blue-100 text-blue-700';
    if (status === 'read')    return 'bg-yellow-100 text-yellow-700';
    if (status === 'replied') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-600';
  };

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);
  const counts   = {
    all:     inquiries.length,
    new:     inquiries.filter(i => i.status === 'new').length,
    read:    inquiries.filter(i => i.status === 'read').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Inquiries</h1>
            <p className="text-gray-500 mt-1">Client messages from the contact form</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-6">
            {['all', 'new', 'read', 'replied'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                }`}>
                {f} ({counts[f]})
              </button>
            ))}
          </div>

          <div className="flex gap-6">
            {/* List */}
            <div className="flex-1 space-y-3">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm text-center py-16 text-gray-400">
                  <p className="text-4xl mb-3">📩</p>
                  <p>No inquiries found.</p>
                </div>
              ) : filtered.map(inq => (
                <div key={inq.id}
                  onClick={() => { setSelected(inq); updateStatus(inq.id, inq.status === 'new' ? 'read' : inq.status); }}
                  className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition border-l-4 ${
                    inq.status === 'new'     ? 'border-blue-500'   :
                    inq.status === 'read'    ? 'border-yellow-400' :
                    'border-green-500'
                  } ${selected?.id === inq.id ? 'ring-2 ring-blue-300' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{inq.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{inq.email}</p>
                      {inq.subject && <p className="text-sm font-medium text-gray-700 mt-1">{inq.subject}</p>}
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">{inq.message}</p>
                    </div>
                    <div className="ml-4 text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">{new Date(inq.created_at).toLocaleDateString()}</p>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(inq.id); }}
                        className="mt-2 p-1.5 text-red-400 hover:bg-red-50 rounded transition">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            {selected && (
              <div className="w-96 bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">Inquiry Details</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">FROM</p>
                    <p className="font-semibold text-gray-900">{selected.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMail size={14} className="text-blue-500" /> {selected.email}
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiPhone size={14} className="text-blue-500" /> {selected.phone}
                    </div>
                  )}
                  {selected.subject && (
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">SUBJECT</p>
                      <p className="text-sm font-medium text-gray-800">{selected.subject}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1">
                      <FiMessageSquare size={12} /> MESSAGE
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                      {selected.message}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-2">UPDATE STATUS</p>
                    <div className="flex gap-2">
                      {['new', 'read', 'replied'].map(s => (
                        <button key={s} onClick={() => updateStatus(selected.id, s)}
                          className={`flex-1 text-xs py-2 rounded-lg font-semibold capitalize transition ${
                            selected.status === s
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    Received: {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
