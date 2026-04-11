'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import API   from '../../../lib/axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiCalendar, FiClock, FiUser, FiMail, FiPhone } from 'react-icons/fi';

export default function ManageMeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');

  const fetchMeetings = () => {
    API.get('/meetings')
      .then(r => setMeetings(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => { fetchMeetings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/meetings/${id}`, { status });
      toast.success(`Meeting marked as "${status}"`);
      fetchMeetings();
    } catch { toast.error('Failed to update status.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this meeting?')) return;
    try {
      await API.delete(`/meetings/${id}`);
      toast.success('Meeting deleted.');
      fetchMeetings();
    } catch { toast.error('Failed to delete.'); }
  };

  const statusColor = (status) => {
    if (status === 'pending')   return 'bg-yellow-100 text-yellow-700';
    if (status === 'confirmed') return 'bg-green-100  text-green-700';
    if (status === 'cancelled') return 'bg-red-100    text-red-700';
    return 'bg-gray-100 text-gray-600';
  };

  const filtered = filter === 'all' ? meetings : meetings.filter(m => m.status === filter);
  const counts = {
    all:       meetings.length,
    pending:   meetings.filter(m => m.status === 'pending').length,
    confirmed: meetings.filter(m => m.status === 'confirmed').length,
    cancelled: meetings.filter(m => m.status === 'cancelled').length,
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage Meetings</h1>
            <p className="text-gray-500 mt-1">Scheduled meeting requests from clients</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-6">
            {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
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

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-700">Meeting Requests</h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📅</p>
                <p>No meetings found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-sm text-gray-500 font-semibold">
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Client</th>
                      <th className="px-6 py-3">Date & Time</th>
                      <th className="px-6 py-3">Topic</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m, idx) => (
                      <tr key={m._id} className="border-t hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-400 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                              {m.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{m.name}</p>
                              <p className="text-xs text-gray-400 flex items-center gap-1">
                                <FiMail size={10} /> {m.email}
                              </p>
                              {m.phone && (
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  <FiPhone size={10} /> {m.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                            <FiCalendar size={13} className="text-blue-500" /> {m.date}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <FiClock size={13} className="text-blue-500" /> {m.time}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          <p className="line-clamp-1">{m.topic || '—'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(m.status)}`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {/* Quick status buttons */}
                            {m.status !== 'confirmed' && (
                              <button onClick={() => updateStatus(m._id, 'confirmed')}
                                className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition font-medium">
                                Confirm
                              </button>
                            )}
                            {m.status !== 'cancelled' && (
                              <button onClick={() => updateStatus(m._id, 'cancelled')}
                                className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition font-medium">
                                Cancel
                              </button>
                            )}
                            {m.status !== 'pending' && (
                              <button onClick={() => updateStatus(m._id, 'pending')}
                                className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-200 transition font-medium">
                                Pending
                              </button>
                            )}
                            <button onClick={() => handleDelete(m._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                              <FiTrash2 size={15} />
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
