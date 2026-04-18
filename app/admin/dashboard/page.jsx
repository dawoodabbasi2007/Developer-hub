'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import AdminSidebar   from '../../../components/admin/AdminSidebar';
import Link from 'next/link';
import API from '../../../lib/axios';
import { FiSettings, FiBriefcase, FiFileText, FiMail, FiCalendar, FiArrowRight } from 'react-icons/fi';

export default function DashboardPage() {
  const [stats,   setStats]   = useState({ services:0, portfolio:0, blogs:0, inquiries:0, meetings:0 });
  const [loading, setLoading] = useState(true);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentMeetings,  setRecentMeetings]  = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/services/all'),
      API.get('/portfolio/all'),
      API.get('/blog/all'),
      API.get('/inquiries'),
      API.get('/meetings'),
    ]).then(([s, p, b, i, m]) => {
      setStats({ services: s.data.length, portfolio: p.data.length,
        blogs: b.data.length, inquiries: i.data.length, meetings: m.data.length });
      setRecentInquiries(i.data.slice(0, 5));
      setRecentMeetings(m.data.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Services',   value: stats.services,  icon: FiSettings,  color: 'bg-blue-500',   href: '/admin/services'   },
    { label: 'Portfolio',  value: stats.portfolio,  icon: FiBriefcase, color: 'bg-purple-500', href: '/admin/portfolio'  },
    { label: 'Blog Posts', value: stats.blogs,      icon: FiFileText,  color: 'bg-green-500',  href: '/admin/blog'       },
    { label: 'Inquiries',  value: stats.inquiries,  icon: FiMail,      color: 'bg-yellow-500', href: '/admin/inquiries'  },
    { label: 'Meetings',   value: stats.meetings,   icon: FiCalendar,  color: 'bg-red-500',    href: '/admin/meetings'   },
  ];

  const statusColor = (s, type) => {
    if (type === 'inquiry') {
      return s==='new'?'bg-blue-100 text-blue-600':s==='read'?'bg-yellow-100 text-yellow-600':'bg-green-100 text-green-600';
    }
    return s==='pending'?'bg-yellow-100 text-yellow-600':s==='confirmed'?'bg-green-100 text-green-600':'bg-red-100 text-red-600';
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your platform.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-10">
                {statCards.map(({ label, value, icon: Icon, color, href }) => (
                  <Link key={label} href={href}
                    className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition group">
                    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500 mt-1">{label}</p>
                  </Link>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-lg">Recent Inquiries</h2>
                    <Link href="/admin/inquiries" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                      View All <FiArrowRight size={14} />
                    </Link>
                  </div>
                  {recentInquiries.length === 0 ? <p className="text-gray-400 text-sm">No inquiries yet.</p> : (
                    <ul className="space-y-3">
                      {recentInquiries.map(inq => (
                        <li key={inq.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm text-gray-800">{inq.name}</p>
                            <p className="text-xs text-gray-400">{inq.email}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(inq.status,'inquiry')}`}>
                            {inq.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-lg">Recent Meetings</h2>
                    <Link href="/admin/meetings" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                      View All <FiArrowRight size={14} />
                    </Link>
                  </div>
                  {recentMeetings.length === 0 ? <p className="text-gray-400 text-sm">No meetings yet.</p> : (
                    <ul className="space-y-3">
                      {recentMeetings.map(m => (
                        <li key={m.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm text-gray-800">{m.name}</p>
                            <p className="text-xs text-gray-400">{m.date} at {m.time}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(m.status,'meeting')}`}>
                            {m.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
